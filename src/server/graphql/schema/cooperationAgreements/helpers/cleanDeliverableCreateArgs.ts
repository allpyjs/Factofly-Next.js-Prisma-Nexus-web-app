import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';

export default function cleanDeliverableCreateArgs(
  data: NexusGenInputs['DeliverableCreateInputArgs']
): Prisma.CooperationAgreementDeliverableCreateWithoutCooperationAgreementInput {
  return {
    description: data.description
  };
}
