import { RecordType } from '@prisma/client';
import { arg, mutationField, nonNull } from 'nexus';
import { NexusGenObjects } from '../../.generated/nexus-typegen';
import { Context } from '../../context';
import cleanCooperationAgreementUpdateArgs from './helpers/cleanCooperationAgreementUpdateArgs';

export const UpdateCooperationAgreementMutation = mutationField((t) => {
  t.field('updateCooperationAgreement', {
    type: 'CooperationAgreement',
    args: {
      data: nonNull(arg({ type: 'CooperationAgreementUpdateInputArgs' })),
      where: nonNull(arg({ type: 'WhereUniqueInputArgs' }))
    },
    authorize: async (source, { where }, context: Context) => {
      if (!context.user || !context.auth.isUser(context.user)) {
        return false;
      }
      const cooperationAgreement = await context.prisma.cooperationAgreement.findUnique({
        where,
        select: { userId: true }
      });
      if (!cooperationAgreement) return false;
      if (context.auth.isAdmin(context.user)) return true;

      if (cooperationAgreement.userId !== context.user.id) {
        return false;
      }
      return true;
    },
    resolve: async (parent, { data, where }, context: Context) => {
      if (!context.user?.id) {
        throw new Error('No user id');
      }

      const oldCooperationAgreement = await context.prisma.cooperationAgreement.findFirst({
        where
      });

      const cooperationAgreementData = await cleanCooperationAgreementUpdateArgs(data);

      const cooperationAgreement = await context.prisma.cooperationAgreement.update({
        data: cooperationAgreementData,
        where
      });

      // notify services
      const {
        dataSources: { auditService, eventService }
      } = context;

      await Promise.all([
        auditService.log(
          'update',
          cooperationAgreement.id,
          RecordType.COOPERATION_AGREEMENT,
          oldCooperationAgreement,
          cooperationAgreement
        ),
        eventService.recordEvent('coop-agreement-updated', {
          cooperationAgreementId: cooperationAgreement.id
        })
      ]);

      return cooperationAgreement as NexusGenObjects['CooperationAgreement'];
    }
  });
});

export default UpdateCooperationAgreementMutation;
