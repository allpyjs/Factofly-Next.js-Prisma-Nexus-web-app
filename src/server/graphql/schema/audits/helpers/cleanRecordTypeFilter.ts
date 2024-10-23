import { NexusGenInputs } from '~/server/graphql/.generated/nexus-typegen';
import { Prisma } from '~/server/utils/prismaClient';

export default function cleanRecordTypeFilter(
  data: NexusGenInputs['RecordTypeFilter'] | null | undefined
): Prisma.EnumRecordTypeFilter | undefined {
  if (!data) {
    return undefined;
  }

  return {
    equals: data.equals ?? undefined,
    in: data.in ?? undefined,
    not: data.not ?? undefined,
    notIn: data.notIn ?? undefined
  };
}
