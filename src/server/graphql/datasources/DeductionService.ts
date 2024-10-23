import { RecordType } from '@prisma/client';
import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { IContextData } from '../IContextData';
import NotificationService from './NotificationService';
import AuditService from './AuditService';
import cleanDeductionUpdateArgs from '../schema/deductions/helpers/cleanDeductionUpdateArgs';
import { NexusGenInputs, NexusGenObjects } from '../.generated/nexus-typegen';
import convertCurrency from '~/server/utils/convertCurrency';
import EventService from './EventService';

// TODO: Not sure if using Graphql datasources this way is the right way to go. Needs more research.
export default class DeductionService extends DataSource {
  context!: IContextData;

  auditService!: AuditService;

  notificationService!: NotificationService;

  eventService!: EventService;

  constructor(
    auditService: AuditService,
    notificationService: NotificationService,
    eventService: EventService
  ) {
    super();
    this.auditService = auditService;
    this.notificationService = notificationService;
    this.eventService = eventService;
  }

  initialize(config: DataSourceConfig<IContextData>): void {
    this.context = config.context;
  }

  async updateDeduction(
    id: bigint,
    data: NexusGenInputs['DeductionUpdateInputArgs']
  ): Promise<NexusGenObjects['Deduction']> {
    const { prisma } = this.context;

    const previous = await prisma.deduction.findFirst({
      where: { id },
      include: { user: true }
    });

    const deductionData = await cleanDeductionUpdateArgs(data, this.context, previous!.userId);

    if (deductionData.currency && deductionData.total) {
      if (deductionData.currency === 'DKK') {
        deductionData.totalDkk = deductionData.total;
      } else {
        deductionData.conversionDate = new Date();
        deductionData.totalDkk = await convertCurrency(
          deductionData.currency as string,
          'DKK',
          deductionData.total as number,
          deductionData.conversionDate
        );
        deductionData.conversionRate = deductionData.totalDkk / (deductionData.total as number);
      }
    }

    const deduction = await prisma.deduction.update({
      data: deductionData,
      include: { user: true },
      where: { id }
    });

    const toAudit = (input: any) => ({
      ...input,
      user: input.user ? { id: input.user.id } : undefined
    });

    // notify services
    const promises = [
      this.auditService.log(
        'update',
        deduction.id,
        RecordType.DEDUCTION,
        toAudit(previous),
        toAudit(deduction)
      ),
      this.notificationService.deductionUpdated(deduction, previous!),
      this.eventService.recordEvent('deduction-updated', {
        deductionId: deduction.id
      })
    ];

    await Promise.all(promises);

    return deduction as NexusGenObjects['Deduction'];
  }
}
