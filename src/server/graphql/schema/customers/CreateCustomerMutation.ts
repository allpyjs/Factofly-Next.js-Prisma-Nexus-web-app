import { CustomerType, RecordType } from '@prisma/client';
import { arg, mutationField, nonNull } from 'nexus';
import { Context } from '~/server/graphql/context';
import cleanCustomerCreateArgs from './helpers/cleanCustomerCreateArgs';
// import { createEventData, sendEvent, topics } from '../../utils/events';

export const CreateCustomerMutation = mutationField((t) => {
  t.nonNull.field('createCustomer', {
    type: 'Customer',
    args: {
      data: nonNull(arg({ type: 'CustomerCreateInputArgs' }))
    },
    authorize: (_, { data }, context: Context) => {
      if (!context.user || !context.auth.isUser(context.user)) {
        return false;
      }
      if (data.createAsUserId && !context.auth.isAdmin(context.user)) {
        return false;
      }
      return true;
    },
    resolve: async (_, { data }, context) => {
      if (!context.user?.id) {
        throw new Error('No user id');
      }

      const createArgs = await cleanCustomerCreateArgs(data, data.createAsUserId ?? context.user.id);

      const {
        dataSources: { auditService, mailchimpService, eventService }
      } = context;

      const promises = [];

      // we link customers between user accounts by matching on the VAT ID.
      if (createArgs.vatId && createArgs.type === CustomerType.BUSINESS) {
        let company = await context.prisma.company.findFirst({
          where: { vatId: createArgs.vatId as string }
        });

        if (!company) {
          company = await context.prisma.company.create({
            data: { vatId: createArgs.vatId as string, name: createArgs.name as string }
          });

          promises.push(auditService.log('create', company.id, RecordType.COMPANY, company));
        }

        createArgs.company = { connect: { id: company.id } };
      }

      const customer = await context.prisma.customer.create({
        data: createArgs,
        include: { addresses: true, user: true }
      });

      // notify services
      promises.push(auditService.log('create', customer.id, RecordType.CUSTOMER, createArgs));
      promises.push(mailchimpService.update(customer.userId));
      promises.push(
        eventService.recordEvent('customer-created', {
          customerId: customer.id
        })
      );

      await Promise.all(promises);

      return customer;
    }
  });
});

export default CreateCustomerMutation;
