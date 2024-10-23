import { inputObjectType } from 'nexus';

export const DeductionListRelationWhereArgs = inputObjectType({
  name: 'DeductionListRelationWhereArgs',
  definition(t) {
    t.field('every', { type: 'DeductionWhereInputArgs' });
    t.field('some', { type: 'DeductionWhereInputArgs' });
    t.field('none', { type: 'DeductionWhereInputArgs' });
  }
});

export default DeductionListRelationWhereArgs;
