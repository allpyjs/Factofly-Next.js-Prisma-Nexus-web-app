import { inputObjectType } from 'nexus';

export const CooperationAgreementOrderByInputArgs = inputObjectType({
  name: 'CooperationAgreementOrderByInputArgs',
  definition(t) {
    t.field('startDate', { type: 'SortOrder' });
    t.field('user', { type: 'UserOrderByInputArgs' });
    t.field('createdDate', { type: 'SortOrder' });
    t.field('updatedDate', { type: 'SortOrder' });
  }
});

export default CooperationAgreementOrderByInputArgs;
