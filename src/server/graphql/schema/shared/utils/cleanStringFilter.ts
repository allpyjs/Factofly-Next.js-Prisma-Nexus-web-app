import { Prisma } from '../../../../utils/prismaClient';
import { NexusGenInputs } from '../../../.generated/nexus-typegen';

export default function cleanStringFilter(
  stringData: NexusGenInputs['StringFilter'] | null | undefined
): Prisma.StringFilter | undefined {
  if (!stringData) {
    return undefined;
  }

  return {
    contains: stringData.contains ?? undefined,
    endsWith: stringData.endsWith ?? undefined,
    equals: stringData.equals ?? undefined,
    gt: stringData.gt ?? undefined,
    gte: stringData.gte ?? undefined,
    in: stringData.in ?? undefined,
    lt: stringData.lt ?? undefined,
    lte: stringData.lte ?? undefined,
    not: stringData.not ?? undefined,
    notIn: stringData.notIn ?? undefined,
    startsWith: stringData.startsWith ?? undefined,
    mode: 'insensitive'
  };
}
