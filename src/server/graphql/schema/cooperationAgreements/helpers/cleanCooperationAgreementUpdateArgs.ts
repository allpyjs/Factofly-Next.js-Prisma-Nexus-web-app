import { ExtraWorkNotification, PaymentTerm, PaymentType } from '@prisma/client';
import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';
import filterEmpty from '../../../../../utils/filterEmpty';
import cleanDeliverableCreateArgs from './cleanDeliverableCreateArgs';
import cleanDeliverableUpdateArgs from './cleanDeliverableUpdateArgs';

export default async function cleanCooperationAgreementUpdateArgs(
  data: NexusGenInputs['CooperationAgreementUpdateInputArgs']
): Promise<Prisma.CooperationAgreementUpdateInput> {
  return {
    startDate: data.startDate ?? undefined,
    endDate: data.endDate ?? undefined,
    active: data.active ?? undefined,
    openEnded: data.openEnded ?? undefined,
    updatedDate: new Date(),
    terminationAgreement: data.terminationAgreement ?? undefined,
    taskDescription: data.taskDescription ?? undefined,
    extraWork: data.extraWork ?? undefined,
    extraWorkNotification: (data.extraWorkNotification as ExtraWorkNotification) ?? undefined,
    extraWorkNotificationOther: data.extraWorkNotificationOther ?? undefined,
    specialConditions: data.specialConditions ?? undefined,
    equipmentDetails: data.equipmentDetails ?? undefined,
    equipmentSupplied: !!data.equipmentSupplied ?? undefined,
    paymentType: (data.paymentType as PaymentType) ?? undefined,
    paymentTerm: (data.paymentTerm as PaymentTerm) ?? undefined,
    paymentTermOther: data.paymentTermOther ?? undefined,
    paymentTermDays: data.paymentTermDays ?? undefined,
    paymentTermSpecial: data.paymentTermSpecial ?? undefined,
    customer: data.customerId
      ? {
          connect: {
            id: data.customerId
          }
        }
      : undefined,

    // deliverables
    deliverables: data.deliverables
      ? {
          create: data.deliverables.create?.length
            ? data.deliverables.create.map((line) => cleanDeliverableCreateArgs(line))
            : undefined,
          update: data.deliverables.update?.length
            ? data.deliverables.update
                .map((item) =>
                  item === null
                    ? undefined
                    : {
                        data: cleanDeliverableUpdateArgs(item.data),
                        where: item.where
                      }
                )
                .filter(filterEmpty)
            : undefined,
          delete: data.deliverables.delete ?? undefined
        }
      : undefined
  };
}
