import { inputObjectType } from 'nexus';

export const CooperationAgreementUpdateNestedDeliverablesInputArgs = inputObjectType({
  name: 'CooperationAgreementUpdateNestedDeliverablesInputArgs',
  definition(t) {
    t.list.nonNull.field('update', { type: 'CooperationAgreementUpdateNestedDeliverableInputArgs' });
    t.list.nonNull.field('create', { type: 'DeliverableCreateInputArgs' });
    t.list.nonNull.field('delete', { type: 'WhereUniqueInputArgs' });
  }
});

export default CooperationAgreementUpdateNestedDeliverablesInputArgs;
