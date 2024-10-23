import { Audit } from '@prisma/client';
import { NexusGenObjects } from '../../../.generated/nexus-typegen';

export default function toGraphQL(data: Audit): NexusGenObjects['Audit'] {
  return {
    ...data
  };
}
