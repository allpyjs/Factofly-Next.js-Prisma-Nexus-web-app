import { RecordType, SalaryStatus } from '@prisma/client';
import { arg, mutationField, nonNull } from 'nexus';
import { NexusGenObjects } from '../../.generated/nexus-typegen';
import { Context } from '../../context';
import cleanSalaryCreateArgs from './helpers/cleanSalaryCreateArgs';

export const CreateSalaryMutation = mutationField((t) => {
  t.field('createSalary', {
    type: 'Salary',
    args: {
      data: nonNull(arg({ type: 'SalaryCreateInputArgs' }))
    },
    authorize: async (_, __, context) => {
      if (!context.user?.id || !context.auth.isUser(context.user)) {
        return false;
      }
      if (!context.auth.isAdmin(context.user)) {
        return false;
      }

      return true;
    },
    resolve: async (_, { data }, context: Context) => {
      if (!context.user?.id) {
        throw new Error('No user id');
      }
      const salaryData = await cleanSalaryCreateArgs(data);
      const salary = await context.prisma.salary.create({
        data: {
          ...salaryData
        },
        include: { user: true, deductions: true, invoices: true }
      });

      if (data.invoices) {
        await context.prisma.invoice.updateMany({
          data: {
            salaryId: salary.id
          },
          where: { id: { in: data.invoices } }
        });
      }

      if (data.deductions) {
        await context.prisma.deduction.updateMany({
          data: {
            salaryId: salary.id
          },
          where: { id: { in: data.deductions } }
        });
      }

      await context.prisma.salary.findFirst({
        where: {
          id: salary.id
        },
        include: { user: true, deductions: true, invoices: true }
      });

      // notify services
      const {
        dataSources: { auditService, mailchimpService, payrollService }
      } = context;

      const promises = [
        auditService.log('create', salary.id, RecordType.TASK, salaryData),
        mailchimpService.update(Number(salary.userId))
      ];

      if (salary.status === SalaryStatus.PAID) {
        promises.push(payrollService.sendSalary(salary.id));
      }

      await Promise.all(promises);

      return salary as NexusGenObjects['Salary'];
    }
  });
});

export default CreateSalaryMutation;
