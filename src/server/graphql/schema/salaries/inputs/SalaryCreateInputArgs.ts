import { inputObjectType } from 'nexus';

export const SalaryCreateInputArgs = inputObjectType({
  name: 'SalaryCreateInputArgs',
  definition(t) {
    t.nonNull.DateTime('paymentDate');
    t.list.nonNull.int('invoices');
    t.list.nonNull.int('deductions');
    t.BigInt('userId');
  }
});

export default SalaryCreateInputArgs;
