import { RecordType } from '@prisma/client';
import { arg, mutationField, nonNull } from 'nexus';
import { NexusGenObjects } from '../../.generated/nexus-typegen';
import { Context } from '../../context';
import cleanCooperationAgreementCreateArgs from './helpers/cleanCooperationAgreementCreateArgs';

export const CreateCooperationAgreementMutation = mutationField((t) => {
  t.field('createCooperationAgreement', {
    type: 'CooperationAgreement',
    args: {
      data: nonNull(arg({ type: 'CooperationAgreementCreateInputArgs' }))
    },
    authorize: (_, { data }, context: Context) => {
      if (!context.user || !context.auth.isUser(context.user)) {
        return false;
      }
      if (data.createAsUserId && !context.auth.isAdmin(context.user)) {
        return false;
      }
      return true;
    },
    resolve: async (_, { data }, context: Context) => {
      if (!context.user?.id) {
        throw new Error('No user id');
      }

      const cooperationAgreementData = await cleanCooperationAgreementCreateArgs(
        data,
        context,
        data.createAsUserId ?? context.user.id
      );

      const cooperationAgreement = await context.prisma.cooperationAgreement.create({
        data: {
          ...cooperationAgreementData
        }
      });

      // notify services
      const {
        dataSources: { auditService, eventService }
      } = context;

      await Promise.all([
        auditService.log(
          'create',
          cooperationAgreement.id,
          RecordType.COOPERATION_AGREEMENT,
          cooperationAgreement
        ),
        eventService.recordEvent('coop-agreement-created', {
          cooperationAgreementId: cooperationAgreement.id
        })
      ]);

      return cooperationAgreement as NexusGenObjects['CooperationAgreement'];
    }
  });
});

export default CreateCooperationAgreementMutation;
