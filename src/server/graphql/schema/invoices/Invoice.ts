import { arg, objectType } from 'nexus';
import addDays from 'date-fns/addDays';
import { RecordType } from '@prisma/client';
import getLinesPrice from '../shared/utils/getLinesPrice';
import cleanInvoiceLineOrder from './helpers/cleanInvoiceLineOrder';
import { Context, GraphQLContext } from '~/server/graphql/context';
import { invoiceStatuses } from './invoiceStatuses';

const getLinesTotalPrice = async (parent: any, ctx: Context) => {
  let lines;
  if (parent.lines) {
    lines = parent.lines;
  }

  if (!lines) {
    const invoice = await ctx.prisma.invoice.findUnique({
      where: { id: parent.id },
      select: {
        lines: {
          select: {
            quantity: true,
            unitPrice: true
          }
        }
      }
    });

    lines = invoice?.lines;
  }

  return getLinesPrice(lines);
};

const vatPercentage = 25.0;

export const Invoice = objectType({
  name: 'Invoice',
  definition(t) {
    t.implements('Node');
    t.implements('Owned');

    t.nonNull.BigInt('userId', { description: 'Id of user' });
    t.nonNull.field('user', {
      type: 'User',
      description: 'Owner of the invoice',
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

    t.nonNull.boolean('overdue', {
      resolve: ({ invoiceDate, paymentDueDays }) => new Date() > addDays(invoiceDate, paymentDueDays)
    });
    t.nonNull.DateTime('dueDate', {
      resolve: ({ invoiceDate, paymentDueDays }) => addDays(invoiceDate, paymentDueDays)
    });
    t.int('economicInvoiceId');

    t.nonNull.field('status', {
      type: 'InvoiceStatusEnum',
      description: 'Status enum',
      resolve: ({ status }: any, _, context: GraphQLContext) => {
        if (context.auth.isAdmin(context.user!)) return status;
        // FAC-129: Hide statuses from user
        switch (status) {
          case invoiceStatuses.SENT_TO_COMPANY_NEEDS_CONTRACT:
          case invoiceStatuses.SENT_TO_COMPANY_CONTRACT_MADE:
            return invoiceStatuses.SENT_TO_COMPANY as typeof status;
          case invoiceStatuses.SALARY_PAID_CUSTOMER_NOT_PAID:
          case invoiceStatuses.SALARY_PAID_CUSTOMER_PAID:
            return invoiceStatuses.SALARY_PAID as typeof status;
          default:
            return status;
        }
      }
    });

    t.nonNull.list.nonNull.field('serviceLogs', {
      type: 'ServiceLog',
      description: 'Service logs',
      resolve: (parent: any, _, context) =>
        context.prisma.serviceLogs.findMany({
          where: { recordId: parent.id, recordType: RecordType.INVOICE },
          orderBy: { createdDate: 'desc' }
        })
    });

    t.string('reference', { description: 'Invoice reference' });
    t.string('note', { description: 'Invoice note' });
    t.BigInt('visibleId', { description: 'User-centric identifier' });
    t.nonNull.string('currency', { description: 'Invoiced currency' });
    t.nonNull.boolean('includeVat', { description: 'Is VAT applied to invoice' });
    t.nonNull.boolean('earlyPayment', { description: 'Whether the invoice should be paid early or not' });
    t.nonNull.boolean('vacationPayment', {
      description: 'Should this invoice set aside some of the value to vacation payments'
    });
    t.nonNull.int('paymentDueDays', { description: 'Days due for this invoice' });
    t.nonNull.int('hoursWorked', { description: 'Hours worked - insurance wise' });
    t.nonNull.boolean('termsAccepted', { description: 'Invoice terms accepted' });
    t.nonNull.field('invoiceDate', {
      type: 'DateTime',
      description: 'Date when invoiced'
    });
    t.field('startDate', {
      type: 'DateTime',
      description: 'Date when the work started'
    });
    t.field('endDate', {
      type: 'DateTime',
      description: 'Date when the work end'
    });

    t.BigInt('jobTypeId', { description: 'Id of job type' });
    t.field('jobType', {
      type: 'JobType',
      description: 'Job type of the invoice',
      resolve: async (parent: any, _, context) => {
        if (!parent.jobTypeId) {
          return null;
        }

        if (parent.jobType) {
          return parent.jobType;
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

    t.BigInt('taskId', { description: 'Id of task' });
    t.field('task', {
      type: 'Task',
      description: 'Task based on this invoice',
      resolve: async (parent: any, _, context) => {
        if (!parent?.taskId) {
          return null;
        }

        if (parent.task) return parent.task;

        const task: any = await context.prisma.task.findUnique({
          where: { id: parent.taskId }
        });
        if (!task) {
          throw new Error('No matching task found');
        }
        return task;
      }
    });

    t.nonNull.BigInt('customerId', { description: 'Id of customer' });
    t.nonNull.field('customer', {
      type: 'Customer',
      description: 'Customer of the invoice - see also customerCopy',
      resolve: async (parent: any, _, context) => {
        if (parent.customer) return parent.customer;

        const customer = await context.prisma.customer.findUnique({
          where: { id: parent.customerId }
        });
        if (!customer) {
          throw new Error('No matching customer found');
        }
        return customer;
      }
    });
    t.string('sendInvoiceCopyTo');
    t.nonNull.string('customerContact');
    t.nonNull.string('customerEmail');
    t.nonNull.string('customerAddress');
    t.nonNull.string('customerPostalCode');
    t.nonNull.string('customerCity');

    t.nonNull.list.nonNull.field('lines', {
      type: 'InvoiceLine',
      description: 'Invoice lines',
      args: {
        orderBy: arg({ type: 'InvoiceLineOrderByInputArgs' })
      },
      resolve: (parent: any, { orderBy }, context) => {
        if (parent.lines) {
          // add the user id to the line so that we can use it later in validating the permissions.
          return parent.lines.map((line: any) => ({ ...line, invoice: { userId: parent.userId } }));
        }

        return context.prisma.invoiceLine.findMany({
          where: { invoiceId: parent.id },
          orderBy: cleanInvoiceLineOrder(orderBy || { index: 'asc' })
        });
      }
    });

    t.nonNull.field('totalPrice', {
      type: 'Float',
      resolve(parent, args, ctx) {
        return getLinesTotalPrice(parent, ctx);
      }
    });
    t.nonNull.decimal('subtotalDkk');
    t.decimal('paidAmountDkk', { description: 'The final amount that was paid by the customer' });
    t.decimal('feeAmountDkk', { description: 'The fee payable to Factofly' });
    t.nonNull.decimal('subtotalDkk');
    t.nonNull.field('totalPriceWithVat', {
      type: 'Float',
      async resolve(parent, args, ctx) {
        const totalPrice = await getLinesTotalPrice(parent, ctx);
        if (totalPrice) {
          return parent.includeVat ? totalPrice * (vatPercentage / 100 + 1) : totalPrice;
        }
        return 0;
      }
    });
    t.nonNull.field('vatAmount', {
      type: 'Float',
      async resolve(parent, args, ctx) {
        if (parent.includeVat) {
          const totalPrice = await getLinesTotalPrice(parent, ctx);
          if (totalPrice) {
            return totalPrice * (vatPercentage / 100);
          }
        }
        return 0;
      }
    });
    // TODO Change when allowing dynamic values.
    t.nonNull.field('vatPercentage', {
      type: 'Float',
      resolve: () => vatPercentage,
      description: 'Percentage of vat'
    });

    t.nonNull.int('creditsUsed');
    t.nonNull.string('discountType');
    t.nonNull.decimal('discountValue');
    t.nonNull.decimal('discountMaxValue');

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

export default Invoice;
