import { RewardType } from '@prisma/client';
import { objectType } from 'nexus';
import logger from '../../../../utils/logger';
import { decryptRecord } from '../../../utils/encryption';
import replaceCharacters from '../../../utils/replaceCharacters';
import { GraphQLContext } from '../../context';

const adminOnly = (_: any, __: any, context: GraphQLContext) =>
  !!context.user && context.auth.isAdmin(context.user);

export const User = objectType({
  name: 'User',
  definition(t) {
    t.implements('Node');
    t.nonNull.field('displayName', {
      type: 'String',
      description: 'Users displayable name, using first name, last name or email to create this',
      resolve: (parent) =>
        (parent.firstName && parent.lastName
          ? `${parent.firstName} ${parent.lastName}`
          : parent.email?.split('@')?.[0]) || 'unknown'
    });
    t.string('firstName', { description: 'User first name' });
    t.string('lastName', { description: 'User last name' });
    t.nonNull.string('uuid', { description: 'A globally unique identifier for the user' });
    t.string('referral', { description: 'Referral string - where user signed up from' });
    t.string('userSpecifiedReferral', { description: 'Where the user says they heard about Factofly from' });
    t.string('freelancerSituation', { description: 'What work situation the freelancer is currently in' });
    t.string('referralLinkCode', { description: 'A shareable code for referring other users to the system' });
    t.string('phoneNumber', { description: 'User phone number' });
    t.nonNull.boolean('vacationPayment', {
      description: 'Whether this user is setting some money aside for the vacation payment'
    });
    t.int('economicCustomerGroupId', {
      description: 'The e-conomic customer group number to use for this user'
    });
    t.int('economicEmployeeId', { description: 'The e-conomic employee number to use for this user' });
    t.nonNull.string('email', { description: 'User email' });
    t.nonNull.boolean('emailVerified', { description: 'Is user email verified' });
    t.nonNull.int('loginCount', { description: 'Number of times the user has logged in' });
    t.nonNull.boolean('conversionTracked', {
      description: 'Whether or not the tracking code for the ad conversion has been fired'
    });
    t.nonNull.boolean('active', { description: 'Whether the user is active or not' });
    t.nonNull.field('role', { type: 'RoleEnum' });

    t.field('salaryPaymentType', {
      type: 'SalaryPaymentTypeEnum',
      authorize: adminOnly,
      description: 'When the salary should be paid out for the user'
    });
    t.float('salaryPaymentDay', {
      authorize: adminOnly,
      description: 'The specific day of the month the salary should be paid out on (use 31 for last day)'
    });
    t.float('salaryPaymentValue', {
      authorize: adminOnly,
      description: 'The amount of money needed to be reached before a payout will be made'
    });
    t.float('baseRate', {
      authorize: adminOnly,
      description: 'The base rate that will be charged for the user'
    });

    t.field('lastActive', {
      type: 'DateTime',
      description: 'Last time user were active'
    });

    t.boolean('accountSetupComplete', {
      description: 'Whether the user has completed the account setup'
    });

    t.JSON('features', {
      resolve: async (parent, _, context: GraphQLContext) => {
        const features = await context.dataSources.featureService.getFeatures();
        return features;
      }
    });

    t.field('address', {
      type: 'Address',
      description: 'User address',
      resolve: async (parent, _, context) => {
        const address = await context.prisma.address.findFirst({
          where: {
            AND: [{ users: { some: { id: parent.id } } }, { default: true, active: true }]
          }
        });
        return address;
      }
    });

    t.int('availableCredits', {
      resolve: async (parent, _, context: GraphQLContext) => {
        const result: any = await context.prisma.reward.aggregate({
          _sum: {
            valueRemaining: true
          },
          where: {
            userId: parent.id,
            type: RewardType.CREDIT
          }
        });
        // eslint-disable-next-line no-underscore-dangle
        return result._sum.valueRemaining;
      }
    });

    t.field('bankAccountHidden', {
      type: 'BankAccount',
      description: 'User bank account',
      resolve: async (parent, _, context: GraphQLContext) => {
        try {
          const account: any = await context.prisma.bankAccount.findFirst({
            where: { userId: parent.id, default: true, active: true },
            rejectOnNotFound: false
          });

          if (!account) return null;

          account.bankName = account.bankName ? decryptRecord(account.bankName) : null;

          let { bankRegistration, bankAccount } = account;
          if (bankRegistration) {
            bankRegistration = decryptRecord(bankRegistration);
            bankRegistration = replaceCharacters(bankRegistration, '*', 0, bankRegistration.length - 2);
          }

          if (bankAccount) {
            bankAccount = decryptRecord(bankAccount);
            bankAccount = replaceCharacters(bankAccount, '*', 0, bankAccount.length - 4);
          }

          account.bankRegistration = bankRegistration;
          account.bankAccount = bankAccount;

          return account;
        } catch (err) {
          logger.error({ msg: 'Error retrieving bank account info', err });
          return null;
        }
      }
    });
    t.field('bankAccount', {
      type: 'BankAccount',
      description: 'User bank account',
      authorize: adminOnly,
      resolve: async (parent, _, context: GraphQLContext) => {
        try {
          const account: any = await context.prisma.bankAccount.findFirst({
            where: { userId: parent.id, default: true, active: true },
            rejectOnNotFound: false
          });

          if (!account) return null;

          account.bankName = account.bankName ? decryptRecord(account.bankName) : null;

          let { bankRegistration, bankAccount } = account;
          if (bankRegistration) {
            bankRegistration = decryptRecord(bankRegistration);
          }

          if (bankAccount) {
            bankAccount = decryptRecord(bankAccount);
          }

          account.bankRegistration = bankRegistration;
          account.bankAccount = bankAccount;

          return account;
        } catch (err) {
          logger.error({ msg: 'Error retrieving bank account info', err });
          return null;
        }
      }
    });
    t.field('taxInfoHidden', {
      type: 'TaxInfo',
      description: 'User tax info',
      resolve: async (parent, _, context: GraphQLContext) => {
        try {
          const taxInfo = await context.prisma.taxInfo.findFirst({
            where: { userId: parent.id, active: true },
            rejectOnNotFound: false
          });

          if (!taxInfo) return null;
          let { personId } = taxInfo;
          if (personId) {
            personId = decryptRecord(personId);
            personId = replaceCharacters(personId, '*', 2, personId.length);
          }
          taxInfo.personId = personId;
          return taxInfo;
        } catch (err) {
          logger.error({ msg: 'Error retrieving tax info', err });
          return null;
        }
      }
    });
    t.field('taxInfo', {
      type: 'TaxInfo',
      description: 'User tax info',
      authorize: adminOnly,
      resolve: async (parent, _, context: GraphQLContext) => {
        try {
          const taxInfo = await context.prisma.taxInfo.findFirst({
            where: { userId: parent.id, active: true },
            rejectOnNotFound: false
          });

          if (!taxInfo) return null;

          let { personId } = taxInfo;
          if (personId) {
            personId = decryptRecord(personId);
          }
          taxInfo.personId = personId;

          return taxInfo;
        } catch (err) {
          logger.error({ msg: 'Error retrieving tax info', err });
          return null;
        }
      }
    });

    t.string('locale', { description: 'User locale' });
    t.nonNull.string('language', { description: 'User language' });
    t.string('unit', { description: 'Default user unit' });
    t.string('currency', { description: 'Default user currency' });

    t.BigInt('jobTypeId', { description: 'Default job type id' });
    t.field('jobType', {
      type: 'JobType',
      description: 'Default job type',
      resolve: async (parent, _, context) => {
        if (!parent.jobTypeId) {
          return null;
        }
        const jobType = await context.prisma.jobType.findUnique({
          where: { id: parent.jobTypeId }
        });
        if (!jobType) {
          throw new Error('No matching jobType found');
        }
        return jobType;
      }
    });
  }
});

export default User;
