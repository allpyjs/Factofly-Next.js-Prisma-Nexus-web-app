import { inputObjectType } from 'nexus';

export const InvoiceListRelationWhereArgs = inputObjectType({
  name: 'InvoiceListRelationWhereArgs',
  definition(t) {
    t.field('every', { type: 'InvoiceWhereInputArgs' });
    t.field('some', { type: 'InvoiceWhereInputArgs' });
    t.field('none', { type: 'InvoiceWhereInputArgs' });
  }
});

export default InvoiceListRelationWhereArgs;
