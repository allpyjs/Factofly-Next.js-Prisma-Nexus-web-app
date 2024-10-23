import { inputObjectType } from 'nexus';

export const CooperationAgreementWhereInputArgs = inputObjectType({
  name: 'CooperationAgreementWhereInputArgs',
  definition(t) {
    t.field('id', { type: 'BigIntFilter' });
    t.field('createdDate', { type: 'DateTimeFilter' });
    t.field('updatedDate', { type: 'DateTimeFilter' });
    t.field('startDate', { type: 'DateTimeFilter' });
    t.field('user', { type: 'UserWhereInputArgs' });
    t.field('active', { type: 'BoolFilter' });

    t.string('query');
  }
});

export default CooperationAgreementWhereInputArgs;
