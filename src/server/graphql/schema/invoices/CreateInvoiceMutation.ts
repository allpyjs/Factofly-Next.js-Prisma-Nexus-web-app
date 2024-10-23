import { DiscountType, RecordType, Reward, RewardType } from '@prisma/client';
import { arg, mutationField, nonNull } from 'nexus';
import { GraphQLContext } from '../../context';
import { FEATURES, FEATURE_VALUES } from '../../datasources/FeatureService';
import { UpdateInvoiceResult } from '../../datasources/InvoiceService';
import cleanInvoiceCreateArgs from './helpers/cleanInvoiceCreateArgs';
import { invoiceStatuses } from './invoiceStatuses';

export const CreateInvoiceMutation = mutationField((t) => {
  t.nonNull.field('createInvoice', {
    type: 'Invoice',
    args: {
      data: nonNull(arg({ type: 'InvoiceCreateInputArgs' }))
    },
    authorize: async (source, { data }, context: GraphQLContext) => {
      if (!context.user || !context.auth.isUser(context.user)) {
        return false;
      }

      if (data.createAsUserId && !context.auth.isAdmin(context.user)) {
        return false;
      }

      // check that the customer belongs to the user
      const userId = data.createAsUserId ?? context.user.id;
      if (data.customer?.connect?.id) {
        const customer = await context.prisma.customer.findUnique({
          where: { id: data.customer.connect.id },
          select: { userId: true }
        });
        if (!customer || customer.userId !== userId) {
          return false;
        }
      }

      // check that the task belongs to the user
      if (data.task?.connect?.id) {
        const task = await context.prisma.task.findUnique({
          where: { id: data.task.connect.id },
          select: { userId: true }
        });
        if (!task || task.userId !== userId) {
          return false;
        }
      }

      return data.status === 'DRAFT' || data.status === 'SENT';
    },
    resolve: async (parent, { data }, context: GraphQLContext) => {
      if (!context.user?.id) {
        throw new Error('No user id');
      }

      const subtotal = data.lines.create
        .map((x) => x.unitPrice * x.quantity)
        .reduce((prev, current) => prev + current, 0);
      const total = data.includeVat ? subtotal * 1.25 : subtotal;

      const userId = data.createAsUserId ?? context.user.id;
      const user = await context.prisma.user.findUnique({ where: { id: userId } });
      const nextInvoiceId = Number(user!.nextInvoiceId) + 1;

      const invoiceData = await cleanInvoiceCreateArgs(data, context, data.createAsUserId ?? context.user.id);

      // add reward discount to invoice
      let reward: Reward | null = null;
      const {
        dataSources: { featureService }
      } = context;

      if (data.useCredit && (await featureService.featureEnabled(FEATURES.REWARD))) {
        reward = await context.prisma.reward.findFirst({
          where: { type: RewardType.CREDIT, valueRemaining: { gt: 0 }, userId }
        });

        if (reward) {
          const type = await featureService.getFeatureValue(
            FEATURE_VALUES.REWARD_TYPE,
            'PERCENTAGE_DISCOUNT'
          );
          if (type === 'PERCENTAGE_DISCOUNT') {
            invoiceData.creditsUsed = 1;
            invoiceData.discountType = DiscountType.PERCENTAGE;
            invoiceData.discountValue = await featureService.getFeatureNumberValue(
              FEATURE_VALUES.REWARD_VALUE_PERCENTAGE_DISCOUNT
            );
            invoiceData.discountMaxValue = await featureService.getFeatureNumberValue(
              FEATURE_VALUES.REWARD_VALUE_MAX_DISCOUNT
            );
          } else {
            invoiceData.creditsUsed = 1;
            invoiceData.discountType = DiscountType.FIXED;
            invoiceData.discountValue = await featureService.getFeatureNumberValue(
              FEATURE_VALUES.REWARD_VALUE_FIXED_DISCOUNT
            );
          }
        }
      }

      if (data.earlyPayment) {
        // check that the customer has early payment enabled
        const customer = await context.prisma.customer.findUnique({
          where: { id: invoiceData.customer.connect?.id },
          include: { company: true }
        });

        if (customer && customer.company?.allowEarlyPayment) {
          invoiceData.earlyPayment = data.earlyPayment;
        }
      }

      let [invoice] = await context.prisma.$transaction([
        context.prisma.invoice.create({
          data: {
            ...invoiceData,
            subtotal,
            total,
            visibleId: nextInvoiceId
          },
          include: {
            user: true,
            lines: true
          }
        }),
        context.prisma.user.update({ data: { nextInvoiceId }, where: { id: context.user.id } }),
        ...(reward
          ? [
              context.prisma.reward.update({
                data: { valueRemaining: reward.valueRemaining - 1 },
                where: { id: reward.id }
              })
            ]
          : [])
      ]);

      invoice = await context.dataSources.invoiceService.calculateInvoiceTotals(invoice);

      // notify services
      const {
        dataSources: {
          auditService,
          notificationService,
          economicApi,
          mailchimpService,
          rewardService,
          payrollService,
          eventService
        }
      } = context;

      const toAudit = (input: UpdateInvoiceResult) => ({
        ...input,
        user: undefined,
        customer: undefined
      });

      const promises = [
        auditService.log('create', invoice.id, RecordType.INVOICE, toAudit(invoice)),
        notificationService.invoiceCreated(invoice),
        mailchimpService.update(invoice.userId),
        rewardService.checkInvoiceReward(invoice),
        eventService.recordEvent('invoice-created', { invoiceId: invoice.id, status: invoice.status })
      ];

      if (invoice.status !== invoiceStatuses.DRAFT) {
        promises.push(payrollService.sendEmployee(invoice.userId));
      }

      if (invoice.status === invoiceStatuses.PENDING) {
        promises.push(economicApi.sendInvoiceToEconomic(invoice.id));
      }

      await Promise.all(promises);

      return invoice;
    }
  });
});

export default CreateInvoiceMutation;
