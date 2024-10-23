import { CustomerType, RecordType } from '@prisma/client';
import { arg, mutationField, nonNull } from 'nexus';
import { GraphQLContext } from '../../context';
import { cleanCustomerUpdateArgs } from './helpers/cleanCustomerUpdateArgs';

export const UpdateCustomerMutation = mutationField((t) => {
  t.nonNull.field('updateCustomer', {
    type: 'Customer',
    args: {
      data: nonNull(arg({ type: 'CustomerUpdateInputArgs' })),
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    authorize: async (source, { where }, context: GraphQLContext) => {
      if (!context.user || !context.auth.isUser(context.user)) return false;

      const customer = await context.prisma.customer.findUnique({ where, select: { userId: true } });
      if (!customer) return false;
      if (context.auth.isAdmin(context.user)) return true;

      return !!(customer?.userId === context.user.id);
    },
    resolve: async (source, { data, where }, context: GraphQLContext) => {
      const oldCustomer = await context.prisma.customer.findUniqueOrThrow({
        where,
        include: { addresses: true }
      });
      const customerData = cleanCustomerUpdateArgs(data);

      const promises = [];
      const {
        dataSources: { auditService, mailchimpService, eventService }
      } = context;

      // we link customers between user accounts by matching on the VAT ID.
      if (
        customerData.type === CustomerType.BUSINESS &&
        customerData.vatId &&
        (customerData.vatId !== oldCustomer.vatId || !oldCustomer.companyId)
      ) {
        let company = await context.prisma.company.findFirst({
          where: { vatId: customerData.vatId as string }
        });

        if (!company) {
          company = await context.prisma.company.create({
            data: { vatId: customerData.vatId as string, name: customerData.name as string }
          });

          promises.push(auditService.log('create', company.id, RecordType.COMPANY, company));
        }

        customerData.company = { connect: { id: company.id } };
      }

      const customer = await context.prisma.customer.update({
        data: customerData,
        where,
        include: { addresses: true }
      });

      if (context.auth.isAdmin(context.user!) && data.allowEarlyPayment !== undefined && customer.companyId) {
        // only allow administrators to update the early payment
        const oldCompany = await context.prisma.company.findFirst({
          where: { id: customer.companyId }
        });
        const company = await context.prisma.company.update({
          where: { id: customer.companyId },
          data: { allowEarlyPayment: data.allowEarlyPayment! }
        });

        promises.push(auditService.log('update', company.id, RecordType.COMPANY, oldCompany, company));
      }

      // notify services
      promises.push(auditService.log('update', customer.id, RecordType.CUSTOMER, oldCustomer, customer));
      promises.push(mailchimpService.update(customer.userId));
      promises.push(eventService.recordEvent('customer-updated', {
          customerId: customer.id
      }));

      await Promise.all(promises);

      return customer;
    }
  });
});

export default UpdateCustomerMutation;
