import { objectType } from 'nexus';
import apiConfig from '../../../../apiConfig';
import { Context } from '../../context';

export const Dashboard = objectType({
  name: 'Dashboard',
  definition(t) {
    t.field('draft', {
      type: 'DashboardItem',
      resolve: async (parent, args, context: Context) => {
        if (!context.user) return null;

        const result = await context.prisma.$queryRaw<{ amount: number; count: number }[]>`
          select coalesce(sum(total),0) as amount, cast(count(distinct i.id) as int) as count
          from invoice i
          where status =  'DRAFT' and user_id = ${context.user.id}
          `;
        return result.length > 0 ? result[0] : null;
      }
    });
    t.field('open', {
      type: 'DashboardItem',
      resolve: async (parent, args, context: Context) => {
        if (!context.user) return null;

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + apiConfig.invoiceExpiryDays);

        const result = await context.prisma.$queryRaw<{ amount: number; count: number }[]>`
          select coalesce(sum(total),0) as amount, cast(count(distinct i.id) as int) as count
          from invoice i
          where status not in (
            'DRAFT',
            'SALARY_PAID',
            'PAID',
            'SALARY_PAID_CUSTOMER_PAID'
            ) and invoice_date < ${expiryDate} and user_id = ${context.user.id}
          `;
        return result.length > 0 ? result[0] : null;
      }
    });
    t.field('paidOut', {
      type: 'DashboardItem',
      resolve: async (parent, args, context: Context) => {
        if (!context.user) return null;

        const result = await context.prisma.$queryRaw<{ amount: number; count: number }[]>`
          select coalesce(sum(total),0) as amount, cast(count(distinct i.id) as int) as count
          from invoice i
          where status in (
            'SALARY_PAID',
            'PAID',
            'SALARY_PAID_CUSTOMER_PAID',
            'SALARY_PAID_CUSTOMER_NOT_PAID'
            ) and user_id = ${context.user.id}
          `;
        return result.length > 0 ? result[0] : null;
      }
    });
    t.field('expired', {
      type: 'DashboardItem',
      resolve: async (parent, args, context: Context) => {
        if (!context.user) return null;

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + apiConfig.invoiceExpiryDays);

        const result = await context.prisma.$queryRaw<{ amount: number; count: number }[]>`
          select coalesce(sum(total),0) as amount, cast(count(distinct i.id) as int) as count
          from invoice i
          where status not in (
            'DRAFT',
            'SALARY_PAID',
            'PAID',
            'SALARY_PAID_CUSTOMER_PAID'
          ) and invoice_date > ${expiryDate} and user_id = ${context.user.id}
          `;
        return result.length > 0 ? result[0] : null;
      }
    });
  }
});

export default Dashboard;
