import { objectType } from 'nexus';
import getLinesPrice from '../shared/utils/getLinesPrice';
import { completedStatusesKeys, invoicedStatusesKeys, openStatusesKeys } from '../statuses/statuses';

export const Customer = objectType({
  name: 'Customer',
  definition(t) {
    t.implements('Node');
    t.implements('Owned');

    t.nonNull.field('address', {
      type: 'Address',
      description: 'Customer address',
      resolve: async (parent: any, _, context) => {
        let address;
        if (parent.addresses) {
          address = parent.addresses.find((x: any) => x.default);
        }

        if (!address) {
          address = await context.prisma.address.findFirst({
            where: {
              AND: [{ customers: { some: { id: parent.id } } }, { default: true }]
            }
          });
        }

        if (!address) {
          throw new Error('No matching address found');
        }
        return address;
      }
    });

    t.field('ean', { type: 'BigInt', description: 'Customer EAN number' });
    t.field('vatId', { type: 'String', description: 'Customer international vat id' });
    t.nonNull.field('type', { type: 'CustomerTypeEnum', description: 'Type of customer' });
    t.nonNull.string('name', { description: 'Customer name' });
    t.nonNull.string('contact', { description: 'Customer contact person' });
    t.nonNull.string('email', { description: 'Customer email' });
    t.nonNull.string('phoneNumber', { description: 'Customer phone number' });
    t.int('paymentDueDays', { description: 'Customer default due days' });
    t.int('economicCustomerId', { description: 'ID of the customer within e-conomic' });
    t.boolean('allowEarlyPayment', {
      description: 'Whether early payment is allowed for this customer',
      resolve: async (parent: any, _, context) => {
        if (!parent.companyId) return null;

        const company = await context.prisma.company.findUnique({
          where: { id: parent.companyId }
        });

        if (company) return company.allowEarlyPayment;
        return null;
      }
    });
    t.nonNull.BigInt('userId', { description: 'Id of user' });
    t.nonNull.field('user', {
      type: 'User',
      description: 'Owner of the customer',
      resolve: async (parent: any, _, context) => {
        if (parent.user) return parent.user;

        const user = await context.prisma.user.findUnique({
          where: { id: parent.userId }
        });
        if (!user) {
          throw new Error('No matching user found');
        }
        return user;
      }
    });

    t.nonNull.float('invoicedTotal', {
      description: 'Total invoiced',
      async resolve(parent, args, context) {
        const invoices: any = await context.prisma.invoice.findMany({
          where: { customerId: parent.id, active: true, status: { in: invoicedStatusesKeys } },
          select: {
            lines: {
              select: {
                quantity: true,
                unitPrice: true
              }
            }
          }
        });

        if (!invoices || invoices.length === 0) {
          return 0;
        }

        return (
          invoices
            .map(({ lines }: { lines: { unitPrice: number; quantity: number }[] | undefined }) =>
              getLinesPrice(lines)
            )
            .reduce((acc: number, cur: number) => acc + cur) || 0
        );
      }
    });
    t.nonNull.int('openInvoices', {
      description: 'Connected parent customer - only copies have a parent',
      resolve: (parent, _, context) =>
        context.prisma.invoice.count({
          where: {
            customerId: parent.id,
            status: { in: openStatusesKeys }
          }
        }) || 0
    });
    t.nonNull.int('completedInvoices', {
      description: 'Connected parent customer - only copies have a parent',
      resolve: (parent, _, context) =>
        context.prisma.invoice.count({
          where: {
            customerId: parent.id,
            status: { in: completedStatusesKeys }
          }
        }) || 0
    });

    t.nonNull.boolean('active', {
      description: 'Whether or not the item is active. Soft delete items if false'
    });
    t.nonNull.field('createdDate', {
      type: 'DateTime',
      description: 'When item were created'
    });
    t.nonNull.field('updatedDate', {
      type: 'DateTime',
      description: 'When item last were updated'
    });
  }
});

export default Customer;
