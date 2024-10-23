import { inputObjectType } from 'nexus';

export const CooperationAgreementUpdateNestedDeliverableInputArgs = inputObjectType({
  name: 'CooperationAgreementUpdateNestedDeliverableInputArgs',
  definition(t) {
    t.nonNull.field('data', { type: 'DeliverableUpdateInputArgs' });
    t.nonNull.field('where', { type: 'WhereUniqueInputArgs' });
  }
});

export default CooperationAgreementUpdateNestedDeliverableInputArgs;
