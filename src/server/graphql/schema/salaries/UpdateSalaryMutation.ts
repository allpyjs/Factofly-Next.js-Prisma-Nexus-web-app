import {
  Deduction,
  DeductionStatus,
  Invoice,
  InvoiceStatus,
  RecordType,
  Salary,
  SalaryStatus,
  User
} from '@prisma/client';
import { arg, mutationField, nonNull } from 'nexus';
import { NexusGenObjects } from '../../.generated/nexus-typegen';
import { Context } from '../../context';
import cleanSalaryUpdateArgs from './helpers/cleanSalaryUpdateArgs';

type SalaryType = Salary & {
  deductions: Deduction[];
  invoices: Invoice[];
  user: User;
};

const toAudit = (record: SalaryType) => ({
  ...record,
  user: undefined,
  invoices: record.invoices.map((x) => x.id),
  deductions: record.deductions.map((x) => x.id)
});

export const UpdateSalaryMutation = mutationField((t) => {
  t.field('updateSalary', {
    type: 'Salary',
    args: {
      data: nonNull(arg({ type: 'SalaryUpdateInputArgs' })),
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    authorize: async (source, { where }, context) => {
      if (!context.user || !context.auth.isUser(context.user)) {
        return false;
      }

      const salary = await context.prisma.salary.findUnique({
        where,
        select: { userId: true }
      });

      if (!salary) return false;
      if (context.auth.isAdmin(context.user)) return true;

      if (salary.userId !== context.user.id) {
        return false;
      }
      return true;
    },
    resolve: async (_, { data, where }, context: Context) => {
      const salaryId = where.id;

      const oldSalary = await context.prisma.salary.findUniqueOrThrow({
        where,
        include: { user: true, deductions: true, invoices: true }
      });

      const salaryData = await cleanSalaryUpdateArgs(data, context, oldSalary.userId);

      if (data.invoices) {
        await context.prisma.invoice.updateMany({
          data: {
            salaryId
          },
          where: { id: { in: data.invoices.map((x) => BigInt(x)) } }
        });
      }

      if (data.deductions) {
        await context.prisma.deduction.updateMany({
          data: {
            salaryId
          },
          where: { id: { in: data.deductions.map((x) => BigInt(x)) } }
        });
      }

      const salary = await context.prisma.salary.update({
        data: {
          ...salaryData
        },
        include: { user: true, deductions: true, invoices: true },
        where
      });

      // get services
      const {
        dataSources: {
          auditService,
          invoiceService,
          deductionService,
          mailchimpService,
          payrollService,
          economicApi
        }
      } = context;

      let promises: Promise<any | void>[] = [];

      if (salary.status === SalaryStatus.PAID) {
        // update invoice statuses
        const invoiceUpdatePromises = salary.invoices
          .map((invoice) => {
            if (invoice.status === InvoiceStatus.PAID) {
              return invoiceService.updateInvoice(invoice.id, {
                status: InvoiceStatus.SALARY_PAID_CUSTOMER_PAID
              });
            }
            if (invoice.status === InvoiceStatus.APPROVED_BY_COMPANY) {
              return invoiceService.updateInvoice(invoice.id, {
                status: InvoiceStatus.SALARY_PAID_CUSTOMER_NOT_PAID
              });
            }
            return null;
          })
          .filter((promise) => promise !== null) as Promise<any>[];

        promises = [...promises, ...invoiceUpdatePromises];
      }

      // update deduction statuses
      const deductionUpdatePromises = salary.deductions
        .map((deduction) => {
          if (deduction.status !== DeductionStatus.APPROVED) {
            return deductionService.updateDeduction(deduction.id, {
              status: DeductionStatus.APPROVED
            });
          }
          return null;
        })
        .filter((promise) => promise !== null) as Promise<any>[];

      promises = [
        ...promises,
        ...deductionUpdatePromises,
        auditService.log('update', salary.id, RecordType.SALARY, toAudit(oldSalary), toAudit(salary)),
        mailchimpService.update(salary.userId)
      ];

      if (salary.status === SalaryStatus.SENT) {
        promises.push(economicApi.createFeeInvoiceForSalary(salary.id));
        promises.push(payrollService.sendSalary(salary.id));
      }

      await Promise.all(promises);

      return salary as NexusGenObjects['Salary'];
    }
  });
});

export default UpdateSalaryMutation;
