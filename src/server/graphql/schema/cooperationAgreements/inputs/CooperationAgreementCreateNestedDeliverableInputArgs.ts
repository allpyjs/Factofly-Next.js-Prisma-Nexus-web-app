import { inputObjectType } from 'nexus';

export const CooperationAgreementCreateNestedDeliverableInputArgs = inputObjectType({
  name: 'CooperationAgreementCreateNestedDeliverableInputArgs',
  definition(t) {
    t.nonNull.list.nonNull.field('create', { type: 'DeliverableCreateInputArgs' });
  }
});

export default CooperationAgreementCreateNestedDeliverableInputArgs;
