import { ExtraWorkNotification, PaymentTerm, PaymentType } from '@prisma/client';
import { GetGen } from 'nexus/dist/core';
import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';

export default async function cleanCooperationAgreementCreateArgs(
  data: NexusGenInputs['CooperationAgreementCreateInputArgs'],
  context: GetGen<'context'>,
  userId: bigint | number
): Promise<Prisma.CooperationAgreementCreateInput> {
  return {
    startDate: data.startDate,
    endDate: data.endDate,
    active: data.active,
    openEnded: data.openEnded,
    terminationAgreement: data.terminationAgreement,
    taskDescription: data.taskDescription,
    extraWork: data.extraWork,
    extraWorkNotification: data.extraWorkNotification as ExtraWorkNotification,
    extraWorkNotificationOther: data.extraWorkNotificationOther ?? undefined,
    specialConditions: data.specialConditions,
    equipmentDetails: data.equipmentDetails ?? undefined,
    equipmentSupplied: !!data.equipmentSupplied,
    paymentType: data.paymentType as PaymentType,
    paymentTerm: data.paymentTerm as PaymentTerm,
    paymentTermOther: data.paymentTermOther,
    paymentTermDays: data.paymentTermDays,
    paymentTermSpecial: data.paymentTermSpecial,
    customer: {
      connect: {
        id: data.customerId
      }
    },
    user: {
      connect: {
        id: userId
      }
    }
  };
}
