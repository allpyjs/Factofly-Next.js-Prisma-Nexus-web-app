import { Prisma } from '../../../../utils/prismaClient';
import { NexusGenInputs } from '../../../.generated/nexus-typegen';
import cleanNumberFilter from './cleanNumberFilter';

export default function cleanNullableNumberFilter(
  stringData:
    | NexusGenInputs['IntFilter']
    | NexusGenInputs['FloatFilter']
    | NexusGenInputs['BigIntFilter']
    | null
    | undefined
): Prisma.FloatFilter | Prisma.IntFilter | Prisma.BigIntFilter | undefined | null {
  if (stringData === null) {
    return null;
  }

  return cleanNumberFilter(stringData);
}
