import { inputObjectType } from 'nexus';

export const CooperationAgreementCreateInputArgs = inputObjectType({
  name: 'CooperationAgreementCreateInputArgs',
  definition(t) {
    t.nonNull.boolean('active');

    t.nonNull.DateTime('startDate');
    t.DateTime('endDate');
    t.nonNull.BigInt('customerId');
    t.nonNull.boolean('openEnded');

    t.nonNull.string('terminationAgreement');
    t.nonNull.string('taskDescription');

    t.nonNull.boolean('extraWork');
    t.string('extraWorkNotification');
    t.string('extraWorkNotificationOther');

    t.boolean('equipmentSupplied');
    t.string('equipmentDetails');

    t.nonNull.string('specialConditions');
    t.nonNull.string('paymentType');
    t.nonNull.string('paymentTerm');
    t.string('paymentTermOther');
    t.nonNull.int('paymentTermDays');
    t.nonNull.string('paymentTermSpecial');

    t.field('deliverables', { type: 'CooperationAgreementCreateNestedDeliverableInputArgs' });
    t.BigInt('createAsUserId');
  }
});

export default CooperationAgreementCreateInputArgs;
