/* eslint-disable no-underscore-dangle */
import { ReferralStatus, User } from '@prisma/client';
import logger from '~/utils/logger';
import prisma from './prismaClient';

const REFERRAL_PREFIX = 'user_';

export default async function trackReferralRewards(user: User) {
  if (user.referral && user.referral?.startsWith(REFERRAL_PREFIX)) {
    const referralLinkCode = user.referral.replace(REFERRAL_PREFIX, '');
    logger.info(`trackReferralRewards.ts: user registered with code=${referralLinkCode}`);

    const referralUser = await prisma.user.findFirst({ where: { referralLinkCode } });

    if (referralUser) {
      await prisma.user.update({
        where: { id: user.id },
        data: { referral: `user`, referredByUserId: referralUser.id }
      });

      const referral = await prisma.referral.findFirst({
        where: { userId: referralUser.id, email: user.email }
      });
      if (!referral) {
        await prisma.referral.create({
          data: { userId: referralUser.id, email: user.email, status: ReferralStatus.SIGNED_UP, message: '' }
        });
      } else {
        await prisma.referral.update({
          where: { id: referral.id },
          data: { status: ReferralStatus.SIGNED_UP }
        });
      }
    }
  }
}
