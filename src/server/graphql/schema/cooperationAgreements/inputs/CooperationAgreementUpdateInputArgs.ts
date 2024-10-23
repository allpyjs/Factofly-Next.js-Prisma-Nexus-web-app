import { inputObjectType } from 'nexus';

export const CooperationAgreementUpdateInputArgs = inputObjectType({
  name: 'CooperationAgreementUpdateInputArgs',
  definition(t) {
    t.boolean('active');

    t.DateTime('startDate');
    t.DateTime('endDate');
    t.boolean('openEnded');
    t.BigInt('customerId');
    t.string('terminationAgreement');
    t.string('taskDescription');

    t.boolean('extraWork');
    t.string('extraWorkNotification');
    t.string('extraWorkNotificationOther');

    t.boolean('equipmentSupplied');
    t.string('equipmentDetails');

    t.string('specialConditions');
    t.string('paymentType');
    t.string('paymentTerm');
    t.string('paymentTermOther');
    t.int('paymentTermDays');
    t.string('paymentTermSpecial');

    // deliverables
    t.field('deliverables', { type: 'CooperationAgreementUpdateNestedDeliverablesInputArgs' });
  }
});
export default CooperationAgreementUpdateInputArgs;
