import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';

export default function cleanDeliverableUpdateArgs(
  data: NexusGenInputs['DeliverableUpdateInputArgs']
): Prisma.CooperationAgreementDeliverableUpdateWithoutCooperationAgreementInput {
  return {
    description: data.description ?? undefined
  };
}
