import { Prisma } from '~/server/utils/prismaClient';
import { NexusGenInputs } from '../../../.generated/nexus-typegen';

export default function cleanRoleFilter(
  roleData: NexusGenInputs['RoleFilter'] | null | undefined
): Prisma.EnumRoleFilter | undefined {
  if (!roleData) {
    return undefined;
  }

  return {
    equals: roleData.equals ?? undefined,
    in: roleData.in ?? undefined,
    not: roleData.not ?? undefined,
    notIn: roleData.notIn ?? undefined
  };
}
