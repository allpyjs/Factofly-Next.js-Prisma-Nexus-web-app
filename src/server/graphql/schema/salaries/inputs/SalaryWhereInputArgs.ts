import { inputObjectType } from 'nexus';

export const SalaryWhereInputArgs = inputObjectType({
  name: 'SalaryWhereInputArgs',
  definition(t) {
    t.field('id', { type: 'BigIntFilter' });
    t.field('createdDate', { type: 'DateTimeFilter' });
    t.field('updatedDate', { type: 'DateTimeFilter' });
    t.field('paymentDate', { type: 'DateTimeFilter' });
    t.field('user', { type: 'UserWhereInputArgs' });
    t.field('status', { type: 'SalaryStatusFilter' });
    t.field('invoices', { type: 'InvoiceListRelationWhereArgs' });
    t.field('deductions', { type: 'DeductionListRelationWhereArgs' });

    t.string('query');
  }
});

export default SalaryWhereInputArgs;
