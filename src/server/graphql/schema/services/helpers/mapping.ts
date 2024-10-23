import { ServiceLog } from '@prisma/client';
import { NexusGenObjects } from '../../../.generated/nexus-typegen';

export default function toGraphQL(data: ServiceLog): NexusGenObjects['ServiceLog'] {
  return {
    ...data
  };
}
