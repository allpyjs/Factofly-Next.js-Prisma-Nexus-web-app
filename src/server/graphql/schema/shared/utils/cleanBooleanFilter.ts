import { Prisma } from '../../../../utils/prismaClient';
import { NexusGenInputs } from '../../../.generated/nexus-typegen';

export default function cleanBooleanFilter(
  boolData: NexusGenInputs['BoolFilter'] | null | undefined
): Prisma.BoolFilter | undefined {
  if (!boolData) {
    return undefined;
  }

  return {
    equals: boolData.equals ?? undefined,
    not: boolData.not ?? undefined
  };
}
