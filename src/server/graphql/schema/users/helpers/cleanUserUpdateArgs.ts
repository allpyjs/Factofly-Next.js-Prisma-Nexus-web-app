import { Language } from '@prisma/client';
import { NexusGenInputs } from '../../../.generated/nexus-typegen';
import { GraphQLContext } from '../../../context';
import { encryptRecord } from '../../../../utils/encryption';
import { Prisma } from '../../../../utils/prismaClient';
import { roles } from '../RoleEnum';

export default async function cleanUserUpdateArgs(
  data: NexusGenInputs['UserUpdateInputArgs'],
  context: GraphQLContext,
  userId: bigint | number
): Promise<Prisma.UserUpdateInput> {
  let result: Prisma.UserUpdateInput = {
    jobType: data.jobType
      ? {
          connect: data.jobType.connect ?? undefined
        }
      : undefined,
    language: data.language as Language,
    currency: data.currency,
    unit: data.unit,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email ?? undefined,
    phoneNumber: data.phoneNumber,
    accountSetupComplete: data.accountSetupComplete ?? undefined,
    userSpecifiedReferral: data.userSpecifiedReferral ?? undefined,
    freelancerSituation: data.freelancerSituation ?? undefined,
    vacationPayment: data.vacationPayment ?? undefined
  };

  // admin only fields
  if (context.user!.role === roles.ADMIN) {
    result = {
      ...result,
      salaryPaymentDay: data.salaryPaymentDay,
      salaryPaymentType: data.salaryPaymentType,
      salaryPaymentValue: data.salaryPaymentValue,
      baseRate: data.baseRate
    };
  }

  if (data.address && data.city && data.postalCode && data.countryId) {
    const address = await context.prisma.address.findFirst({
      where: { users: { some: { id: userId } }, default: true, active: true }
    });

    if (address) {
      result.addresses = {
        update: {
          where: {
            id: address.id
          },
          data: {
            address: data.address,
            city: data.city,
            postalCode: data.postalCode,
            countryId: data.countryId
          }
        }
      };
    } else {
      result.addresses = {
        create: {
          active: true,
          default: true,
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
          countryId: data.countryId
        }
      };
    }
  }

  if (data.bankAccount || data.bankName || data.bankRegistration) {
    const bankAccount = await context.prisma.bankAccount.findFirst({
      where: { userId, default: true, active: true }
    });

    if (bankAccount) {
      result.bankAccounts = {
        update: {
          where: {
            id: bankAccount.id
          },
          data: {
            bankAccount: data.bankAccount ? encryptRecord(data.bankAccount) : null,
            bankName: data.bankName ? encryptRecord(data.bankName) : null,
            bankRegistration: data.bankRegistration ? encryptRecord(data.bankRegistration) : null
          }
        }
      };
    } else {
      result.bankAccounts = {
        create: {
          active: true,
          default: true,
          bankAccount: data.bankAccount ? encryptRecord(data.bankAccount) : null,
          bankName: data.bankName ? encryptRecord(data.bankName) : null,
          bankRegistration: data.bankRegistration ? encryptRecord(data.bankRegistration) : null
        }
      };
    }
  }

  if (data.personId || data.taxCard) {
    const taxInfo = await context.prisma.taxInfo.findFirst({
      where: { userId, active: true }
    });

    if (taxInfo) {
      result.taxInfo = {
        update: {
          where: {
            id: taxInfo.id
          },
          data: {
            personId: data.personId ? encryptRecord(data.personId) : null,
            taxCard: data.taxCard
          }
        }
      };
    } else {
      result.taxInfo = {
        create: {
          active: true,
          personId: data.personId ? encryptRecord(data.personId) : null,
          taxCard: data.taxCard,
          country: { connect: { id: 60 /* Denmark */ } }
        }
      };
    }
  }
  return result;
}
