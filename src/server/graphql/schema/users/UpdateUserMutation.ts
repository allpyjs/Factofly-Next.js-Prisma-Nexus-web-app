import { Address, InvoiceStatus, RecordType, User } from '@prisma/client';
import { ApolloError } from 'apollo-server-core';
import { arg, mutationField, nonNull } from 'nexus';
import { firstOfMonth } from '../../../../utils/dateHelpers';
import { GraphQLContext } from '../../context';
import cleanUserUpdateArgs from './helpers/cleanUserUpdateArgs';
import { roles } from './RoleEnum';

type UserType = User & {
  addresses: Address[];
};

export const UpdateUserMutation = mutationField((t) => {
  t.nonNull.field('updateUser', {
    type: 'User',
    args: {
      data: nonNull(arg({ type: 'UserUpdateInputArgs' })),
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    authorize: async (_, { data, where }, context: GraphQLContext) => {
      const isAuthorized = !!(
        context.user &&
        (where.id === context.user.id || context.user.role === roles.ADMIN)
      );

      if (!isAuthorized) return false;

      if (data.vacationPayment !== undefined) {
        // prevent updating of vacation payment if they have already sent an invoice this month
        const previousValue = await context.prisma.user.findUnique({ where: { id: context.user!.id } });

        if (data.vacationPayment !== previousValue?.vacationPayment) {
          const invoiceCount = await context.prisma.invoice.aggregate({
            _count: { id: true },
            where: {
              userId: context.user!.id,
              invoiceDate: { gte: firstOfMonth() },
              status: { notIn: [InvoiceStatus.DRAFT, InvoiceStatus.CANCELLED] }
            }
          });

          // eslint-disable-next-line no-underscore-dangle
          if (invoiceCount._count.id > 0) {
            return new ApolloError(
              'You cannot change the vacation payment in the same month as an existing invoice',
              'FORBIDDEN'
            );
          }
        }
      }

      return isAuthorized;
    },
    // @ts-ignore TODO: Typescript complains about converting Decimal to number here
    resolve: async (_, { data, where }, context: GraphQLContext) => {
      const previousUser = await context.prisma.user.findUnique({
        where,
        include: { addresses: { where: { active: true, default: true } } }
      });

      const updateData = await cleanUserUpdateArgs(data, context, where.id);
      const user = await context.prisma.user.update({
        data: updateData,
        where,
        include: { addresses: { where: { active: true, default: true } } }
      });

      // notify services
      const { mailchimpService, auditService, payrollService } = context.dataSources;

      const toAddressAuditRecord = (input: Address) => ({
        address: input.address,
        city: input.city,
        postalCode: input.postalCode,
        countryId: input.countryId
      });

      const toAuditRecord = (input: UserType) => ({
        ...input,
        address: input.addresses?.length > 0 ? toAddressAuditRecord(input.addresses[0]) : undefined,
        addresses: undefined
      });

      const promises = [
        auditService.log(
          'update',
          user.id,
          RecordType.USER,
          toAuditRecord(previousUser!),
          toAuditRecord(user)
        ),
        mailchimpService.update(user.id)
      ];

      if (user.zenegyEmployeeUid) {
        promises.push(payrollService.sendEmployee(user.id));
      }

      await Promise.all(promises);

      return user;
    }
  });
});
export default UpdateUserMutation;
