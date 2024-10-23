import { objectType } from 'nexus';
import { toISODateString } from '../../../../utils/formatDate';
import { Context } from '../../context';
// import Invoice from './Invoice';
// import cleanInvoiceOrder from '../invoices/helpers/cleanInvoiceOrder';
// import { cleanStatusLogWhereArgs } from '../helper/whereCleaner';
// import { statuses } from '../statuses/statuses';

export const Salary = objectType({
  name: 'Salary',
  definition(t) {
    t.implements('Node');
    t.implements('Owned');
    t.nonNull.BigInt('userId', { description: 'Id of user' });
    t.nonNull.field('user', {
      type: 'User',
      description: 'Owner of the salary',
      resolve: async (parent, _, context) => {
        const user = await context.prisma.user.findUnique({
          where: { id: parent.userId }
        });
        if (!user) {
          throw new Error('No matching user found');
        }
        return user;
      }
    });

    t.decimal('grossIncome');
    t.decimal('paymentAmount');
    t.nonNull.DateTime('paymentDate');
    t.nonNull.field('status', { type: 'SalaryStatusEnum' });

    t.list.nonNull.field('invoices', { type: 'Invoice' });
    t.list.nonNull.field('deductions', { type: 'Deduction' });

    t.field('payslipUrl', {
      type: 'String',
      description: 'Url that the payslip can be viewed at',
      resolve: async (parent, _, context: Context) => {
        const blob = await context.prisma.attachmentBlob.findFirst({
          where: { attachment: { some: { recordType: 'Salary', recordId: parent.id, name: 'payslip' } } },
          orderBy: { createdDate: 'desc' }
        });
        if (!blob) {
          return null;
        }

        const user = await context.prisma.user.findUnique({
          where: { id: parent.userId }
        });
        if (!user) {
          throw new Error('No matching user found');
        }

        let userName =
          user.firstName && user.lastName ? `${user.firstName}-${user.lastName}` : user.email.split('@')[0];
        userName = userName.replace(/[. /\\]/g, '-').toLowerCase();

        const dateString = toISODateString(parent.paymentDate);

        return `/api/payslip/${parent.id}/${dateString}-${userName}-payslip.pdf`;
      }
    });

    t.field('feeInvoiceUrl', {
      type: 'String',
      description: 'Url that the fee invoice can be viewed at',
      resolve: async (parent, _, context: Context) => {
        const blob = await context.prisma.attachmentBlob.findFirst({
          where: { attachment: { some: { recordType: 'Salary', recordId: parent.id, name: 'fee-invoice' } } },
          orderBy: { createdDate: 'desc' }
        });
        if (!blob) {
          return null;
        }

        const user = await context.prisma.user.findUnique({
          where: { id: parent.userId }
        });
        if (!user) {
          throw new Error('No matching user found');
        }

        let userName =
          user.firstName && user.lastName ? `${user.firstName}-${user.lastName}` : user.email.split('@')[0];
        userName = userName.replace(/[. /\\]/g, '-').toLowerCase();

        const dateString = toISODateString(parent.paymentDate);

        return `/api/fee-invoice/${parent.id}/${dateString}-${userName}-fee-invoice.pdf`;
      }
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

export default Salary;
