import { arg, nonNull, queryField } from 'nexus';
import cooperationAgreementsPagination from './pagination';

export const CooperationAgreementsQuery = queryField((t) => {
  cooperationAgreementsPagination(t);
  t.field('cooperationAgreement', {
    type: 'CooperationAgreement',
    args: {
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    resolve: (parent, args, context) =>
      context.prisma.cooperationAgreement.findUniqueOrThrow({
        where: { ...args.where }
      })
  });
});

export default CooperationAgreementsQuery;
