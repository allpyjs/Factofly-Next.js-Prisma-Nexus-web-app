import { inputObjectType } from 'nexus';

export const DeductionWhereInputArgs = inputObjectType({
  name: 'DeductionWhereInputArgs',
  definition(t) {
    t.field('id', { type: 'BigIntFilter' });
    t.field('createdDate', { type: 'DateTimeFilter' });
    t.field('updatedDate', { type: 'DateTimeFilter' });
    t.field('status', { type: 'DeductionStatusFilter' });
    t.field('active', { type: 'BoolFilter' });
    t.field('description', { type: 'StringFilter' });
    t.field('user', { type: 'UserWhereInputArgs' });

    t.string('query');
  }
});

export default DeductionWhereInputArgs;
