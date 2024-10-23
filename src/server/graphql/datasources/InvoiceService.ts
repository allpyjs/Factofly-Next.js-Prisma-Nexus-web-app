import {
  DiscountType,
  Invoice,
  InvoiceLine,
  InvoiceStatus,
  RecordType,
  Reward,
  RewardType,
  User
} from '@prisma/client';
import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { IContextData } from '../IContextData';
import NotificationService from './NotificationService';
import MailchimpService from './MailchimpService';
import EconomicAPI from './EconomicAPI';
import RewardService from './RewardService';
import AuditService from './AuditService';
import cleanInvoiceUpdateArgs from '../schema/invoices/helpers/cleanInvoiceUpdateArgs';
import { NexusGenInputs } from '../.generated/nexus-typegen';
import FeatureService, { FEATURES, FEATURE_VALUES } from './FeatureService';
import PayrollService from './PayrollService';
import EventService from './EventService';
import apiConfig from '~/apiConfig';
import convertCurrency from '~/server/utils/convertCurrency';
import calculateDiscountRate from '~/server/logic/calculateDiscount';

export type UpdateInvoiceResult = Invoice & { user: User; lines: InvoiceLine[] };

// TODO: Not sure if using Graphql datasources this way is the right way to go. Needs more research.
export default class InvoiceService extends DataSource {
  context!: IContextData;

  auditService!: AuditService;

  notificationService!: NotificationService;

  mailchimpService!: MailchimpService;

  economicApi!: EconomicAPI;

  rewardService!: RewardService;

  featureService!: FeatureService;

  payrollService!: PayrollService;

  eventService!: EventService;

  constructor(
    auditService: AuditService,
    notificationService: NotificationService,
    mailchimpService: MailchimpService,
    economicApi: EconomicAPI,
    rewardService: RewardService,
    featureService: FeatureService,
    payrollService: PayrollService,
    eventService: EventService
  ) {
    super();
    this.auditService = auditService;
    this.notificationService = notificationService;
    this.mailchimpService = mailchimpService;
    this.economicApi = economicApi;
    this.rewardService = rewardService;
    this.featureService = featureService;
    this.payrollService = payrollService;
    this.eventService = eventService;
  }

  initialize(config: DataSourceConfig<IContextData>): void {
    this.context = config.context;
  }

  async calculateInvoiceTotals(invoice: UpdateInvoiceResult): Promise<UpdateInvoiceResult> {
    const { prisma } = this.context;

    const subtotal = invoice.lines
      .map((x) => x.unitPrice * x.quantity)
      .reduce((prev, current) => prev + current, 0);
    const subtotalDkk =
      invoice.currency === 'DKK'
        ? subtotal
        : await convertCurrency(invoice.currency, 'DKK', subtotal, new Date());

    const user = await prisma.user.findFirst({ where: { id: invoice.userId } });

    let baseRate = apiConfig.rates.feeBaseRate;

    // specific rates for referral campaigns
    if (user?.referral?.toLowerCase() === 'mma') {
      baseRate = 0.05;
    }

    // override the base rate with the user's base rate
    if (user?.baseRate) {
      baseRate = Number(user.baseRate);
    }

    // convert base rate from a percentage to a fraction, so 5% = 0.05
    if (baseRate >= 1) baseRate /= 100;

    const invoiceTotalDkk =
      Number(subtotalDkk ?? 0) * (invoice.includeVat ? 1 + apiConfig.rates.taxAmount : 1);

    // default the paid amount to the invoice total in dkk
    let { paidAmountDkk } = invoice;
    if (!paidAmountDkk) {
      paidAmountDkk = invoiceTotalDkk;
    }

    let earlyPaymentRate = await this.featureService.getFeatureNumberValue(
      FEATURE_VALUES.EARLY_PAYMENT_FEE_RATE
    );

    earlyPaymentRate /= 100;

    const invoiceRate = baseRate + (invoice.earlyPayment ? earlyPaymentRate : 0);

    // once the invoice has been paid then we use the paid amount instead of the calculated total
    let totalForFee = paidAmountDkk;

    // fee is calculated on the amount before VAT
    if (invoice.includeVat) {
      totalForFee /= 1 + apiConfig.rates.taxAmount;
    }

    const feeTotal = totalForFee * invoiceRate;

    const discountRate = calculateDiscountRate(
      feeTotal,
      invoice.discountType,
      Number(invoice.discountValue),
      Number(invoice.discountMaxValue)
    );

    const discount = feeTotal * discountRate;

    return prisma.invoice.update({
      data: {
        subtotal,
        subtotalDkk,
        total: invoiceTotalDkk,
        feeAmountDkk: feeTotal,
        discountedFeeAmountDkk: feeTotal - discount,
        conversionDate: new Date(),
        paidAmountDkk
      },
      include: { user: true, lines: true },
      where: { id: invoice.id }
    });
  }

  async updateInvoice(
    id: bigint,
    data: NexusGenInputs['InvoiceUpdateInputArgs']
  ): Promise<UpdateInvoiceResult> {
    const { prisma, auth, user } = this.context;

    const oldInvoice = await prisma.invoice.findUniqueOrThrow({
      where: { id },
      include: { user: true, lines: true }
    });

    const invoiceData = await cleanInvoiceUpdateArgs(data, this.context, oldInvoice.userId);

    // check for fields that only admins can update
    if (!auth.isAdmin(user!)) {
      delete invoiceData.paidAmountDkk;
    }

    // add reward discount to invoice
    let reward: Reward | null = null;
    if (
      data.useCredit &&
      oldInvoice.creditsUsed === 0 &&
      (await this.featureService.featureEnabled(FEATURES.REWARD))
    ) {
      reward = await prisma.reward.findFirst({
        where: { type: RewardType.CREDIT, valueRemaining: { gt: 0 }, userId: oldInvoice.userId }
      });

      if (reward) {
        const type = await this.featureService.getFeatureValue(
          FEATURE_VALUES.REWARD_TYPE,
          'PERCENTAGE_DISCOUNT'
        );
        if (type === 'PERCENTAGE_DISCOUNT') {
          invoiceData.creditsUsed = 1;
          invoiceData.discountType = DiscountType.PERCENTAGE;
          invoiceData.discountValue = await this.featureService.getFeatureNumberValue(
            FEATURE_VALUES.REWARD_VALUE_PERCENTAGE_DISCOUNT
          );
          invoiceData.discountMaxValue = await this.featureService.getFeatureNumberValue(
            FEATURE_VALUES.REWARD_VALUE_MAX_DISCOUNT
          );
        } else {
          invoiceData.creditsUsed = 1;
          invoiceData.discountType = DiscountType.FIXED;
          invoiceData.discountValue = await this.featureService.getFeatureNumberValue(
            FEATURE_VALUES.REWARD_VALUE_FIXED_DISCOUNT
          );
        }
      }
    }

    if (data.earlyPayment) {
      // check that the customer has early payment enabled
      const customerId = invoiceData.customer?.connect?.id ?? oldInvoice.customerId;
      const customer = await prisma.customer.findUnique({
        where: { id: customerId },
        include: { company: true }
      });

      if (customer && customer.company?.allowEarlyPayment) {
        invoiceData.earlyPayment = data.earlyPayment;
      }
    }

    let [invoice] = await prisma.$transaction([
      prisma.invoice.update({
        data: {
          ...invoiceData
        },
        include: { user: true, lines: true },
        where: { id }
      }),
      ...(reward
        ? [
            prisma.reward.update({
              data: { valueRemaining: reward.valueRemaining - 1 },
              where: { id: reward.id }
            })
          ]
        : [])
    ]);

    invoice = await this.calculateInvoiceTotals(invoice);

    const toAudit = (input: UpdateInvoiceResult) => ({
      ...input,
      user: undefined,
      customer: undefined
    });

    // notify services
    const promises = [
      this.auditService.log('update', invoice.id, RecordType.INVOICE, toAudit(oldInvoice), toAudit(invoice)),
      this.notificationService.invoiceUpdated(invoice, oldInvoice),
      this.mailchimpService.update(invoice.userId),
      this.eventService.recordEvent('invoice-updated', {
        invoiceId: invoice.id,
        status: invoice.status
      })
    ];

    if (invoice.status === InvoiceStatus.PENDING && invoice.status !== oldInvoice.status) {
      promises.push(this.economicApi.sendInvoiceToEconomic(invoice.id));
    }

    if (invoice.status !== InvoiceStatus.DRAFT) {
      promises.push(this.payrollService.sendEmployee(invoice.userId));
    }

    if (invoice.status !== oldInvoice.status) {
      promises.push(this.rewardService.checkInvoiceReward(invoice));
    }

    await Promise.all(promises);

    return invoice;
  }
}
