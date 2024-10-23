import { inputObjectType } from 'nexus';

export const SalaryUpdateInputArgs = inputObjectType({
  name: 'SalaryUpdateInputArgs',
  definition(t) {
    t.BigInt('id');
    t.DateTime('paymentDate');
    t.field('status', { type: 'SalaryStatusEnum' });
    t.list.nonNull.int('invoices');
    t.list.nonNull.int('deductions');
  }
});
export default SalaryUpdateInputArgs;
