import { arg, objectType } from 'nexus';
import { GraphQLContext } from '../../context';
import cleanDeliverableOrder from './helpers/cleanDeliverableOrder';

export const CooperationAgreement = objectType({
  name: 'CooperationAgreement',
  definition(t) {
    t.implements('Node');
    t.implements('Owned');
    t.implements('CustomerRelation');

    t.nonNull.BigInt('customerId');
    t.nonNull.BigInt('userId');
    t.nonNull.boolean('active');

    t.nonNull.DateTime('startDate');
    t.DateTime('endDate');
    t.nonNull.boolean('openEnded');

    t.nonNull.string('terminationAgreement');
    t.nonNull.string('taskDescription');

    t.nonNull.boolean('extraWork');
    t.string('extraWorkNotification');
    t.string('extraWorkNotificationOther');

    t.boolean('equipmentSupplied');
    t.string('equipmentDetails');

    t.string('specialConditions');
    t.nonNull.string('paymentType');
    t.nonNull.string('paymentTerm');
    t.string('paymentTermOther');
    t.nonNull.int('paymentTermDays');
    t.string('paymentTermSpecial');

    t.nonNull.list.nonNull.field('deliverables', {
      type: 'Deliverable',
      description: 'Cooperation agreement deliverable',
      args: {
        orderBy: arg({ type: 'DeliverableOrderByInputArgs' })
      },
      resolve: (parent, { orderBy }, context: GraphQLContext) =>
        context.prisma.cooperationAgreementDeliverable.findMany({
          where: { cooperationAgreementId: parent.id },
          orderBy: cleanDeliverableOrder(orderBy)
        })
    });
  }
});

export default CooperationAgreement;
