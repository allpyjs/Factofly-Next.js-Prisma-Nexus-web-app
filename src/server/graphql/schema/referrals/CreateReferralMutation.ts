import { RecordType } from '@prisma/client';
import { ApolloError } from 'apollo-server-core';
import { arg, mutationField, nonNull } from 'nexus';
import apiConfig from '../../../../apiConfig';
import { Context } from '../../context';
import cleanReferralCreateArgs from './helpers/cleanReferralCreateArgs';

export const CreateReferralMutation = mutationField((t) => {
  t.field('createReferral', {
    type: 'Referral',
    args: {
      data: nonNull(arg({ type: 'ReferralCreateInputArgs' }))
    },
    resolve: async (_, { data }, context: Context) => {
      if (!context.user?.id) {
        throw new Error('No user id');
      }

      const existingReferral = await context.prisma.referral.findFirst({
        where: { email: data.email, userId: context.user.id }
      });

      if (existingReferral) {
        throw new ApolloError('This email address has already been referred');
      }

      const referralData = await cleanReferralCreateArgs(
        data,
        context,
        data.createAsUserId ?? context.user.id
      );
      const referral = await context.prisma.referral.create({
        data: {
          ...referralData
        }
      });

      // notify services
      const {
        dataSources: { auditService, mailService, eventService }
      } = context;

      await Promise.all([
        auditService.log('create', referral.id, RecordType.REFERRAL, referral),
        mailService.sendReferralMail(
          `${context.user.firstName} ${context.user.lastName}`,
          context.user.language,
          referral.email,
          referral.message,
          `${apiConfig.baseUrl}/users/sign_up?referral_id=user_${
            context.user.referralLinkCode
          }&login_hint=${encodeURIComponent(referral.email)}`
        ),
        eventService.recordEvent('referral-created', {
          referredEmail: referral.email
        })
      ]);

      return referral;
    }
  });
});

export default CreateReferralMutation;
