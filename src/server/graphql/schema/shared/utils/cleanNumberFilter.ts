import { Prisma } from '../../../../utils/prismaClient';
import { NexusGenInputs } from '../../../.generated/nexus-typegen';

export default function cleanNumberFilter(
  stringData:
    | NexusGenInputs['BigIntFilter']
    | NexusGenInputs['IntFilter']
    | NexusGenInputs['FloatFilter']
    | null
    | undefined
): Prisma.FloatFilter | Prisma.IntFilter | Prisma.BigIntFilter | undefined {
  if (!stringData) {
    return undefined;
  }

  return {
    equals: stringData.equals,
    gt: stringData.gt ?? undefined,
    gte: stringData.gte ?? undefined,
    in: stringData.in ?? undefined,
    lt: stringData.lt ?? undefined,
    lte: stringData.lte ?? undefined,
    not: stringData.not ?? undefined,
    notIn: stringData.notIn ?? undefined
  };
}
