import { Invoice, InvoiceStatus, ReferralStatus, RewardSource, RewardType } from '@prisma/client';
import { DataSource, DataSourceConfig } from 'apollo-datasource';
import * as Sentry from '@sentry/nextjs';
import logger from '~/utils/logger';
import { IContextData } from '../IContextData';

export default class RewardService extends DataSource {
  context!: IContextData;

  initialize(config: DataSourceConfig<IContextData>): void {
    this.context = config.context;
  }

  async checkInvoiceReward(invoice: Invoice): Promise<void> {
    const { prisma } = this.context;
    try {
      if (invoice.status === InvoiceStatus.SENT) {
        const invoiceUser = await prisma.user.findUnique({ where: { id: invoice.userId } });
        if (!invoiceUser || !invoiceUser.referredByUserId) return;

        logger.info(`RewardService.ts: updating referral status for ${invoiceUser.referredByUserId}`);

        await prisma.referral.updateMany({
          data: { status: ReferralStatus.SENT_INVOICE },
          where: {
            email: invoiceUser.email,
            status: { not: ReferralStatus.SENT_INVOICE },
            userId: invoiceUser.referredByUserId
          }
        });
      } else if (invoice.status === InvoiceStatus.PAID) {
        const invoiceUser = await prisma.user.findUnique({ where: { id: invoice.userId } });
        if (!invoiceUser || !invoiceUser.referredByUserId) return;

        const referral = await prisma.referral.findFirst({
          where: {
            email: invoiceUser.email,
            status: { not: ReferralStatus.PAID_INVOICE },
            userId: invoiceUser.referredByUserId
          }
        });

        if (referral) {
          logger.info(`RewardService.ts: adding referral reward for ${invoiceUser.id}`);

          await prisma.$transaction([
            prisma.reward.create({
              data: {
                userId: referral.userId,
                type: RewardType.CREDIT,
                source: RewardSource.REFERRAL,
                sourceId: referral.id,
                value: 1,
                valueRemaining: 1
              }
            }),
            prisma.reward.create({
              data: {
                userId: invoiceUser.id,
                type: RewardType.CREDIT,
                source: RewardSource.REFERRAL,
                sourceId: referral.id,
                value: 1,
                valueRemaining: 1
              }
            }),
            prisma.referral.update({
              data: { status: ReferralStatus.PAID_INVOICE },
              where: { id: referral.id }
            })
          ]);
        }
      }
    } catch (err) {
      Sentry.captureException(err);
      logger.error(`RewardService.ts: error adding referral reward ${err}`);
    }
  }
}
