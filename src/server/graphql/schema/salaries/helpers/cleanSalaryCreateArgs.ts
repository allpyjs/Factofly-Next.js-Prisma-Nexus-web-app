import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';

export default async function cleanSalaryCreateArgs(
  data: NexusGenInputs['SalaryCreateInputArgs']
): Promise<Prisma.SalaryCreateInput> {
  return {
    paymentDate: data.paymentDate,
    user: {
      connect: {
        id: data.userId
      }
    }
  };
}
