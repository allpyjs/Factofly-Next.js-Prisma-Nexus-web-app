import { Prisma } from '../../../../utils/prismaClient';
import { NexusGenInputs } from '../../../.generated/nexus-typegen';

export default function cleanNullableStringFilter(
  stringData: NexusGenInputs['StringFilter'] | null | undefined
): Prisma.StringNullableFilter | undefined | null {
  if (stringData === null) {
    return null;
  }
  if (!stringData) {
    return undefined;
  }

  return {
    contains: stringData.contains ?? undefined,
    endsWith: stringData.endsWith ?? undefined,
    equals: stringData.equals,
    gt: stringData.gt ?? undefined,
    gte: stringData.gte ?? undefined,
    in: stringData.in,
    lt: stringData.lt ?? undefined,
    lte: stringData.lte ?? undefined,
    not: stringData.not,
    notIn: stringData.notIn,
    startsWith: stringData.startsWith ?? undefined
  };
}
