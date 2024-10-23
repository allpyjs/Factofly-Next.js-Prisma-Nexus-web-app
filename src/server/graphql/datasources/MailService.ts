/* eslint-disable @typescript-eslint/no-unused-vars */
import { Language } from '@prisma/client';
import { DataSource, DataSourceConfig } from 'apollo-datasource';
import * as Sentry from '@sentry/nextjs';
import emailServiceClient from '~/server/services/emailServiceClient';
import logger from '~/utils/logger';
import { IContextData } from '../IContextData';

/** This is a wrapper for sending mails to the @factofly/email-service */
export default class MailService extends DataSource {
  context!: IContextData;

  initialize(config: DataSourceConfig<IContextData>): void {
    this.context = config.context;
  }

  async sendStatusChangedMail(
    userDisplayName: string,
    userEmail: string,
    language: Language,
    type: 'invoice' | 'task' | 'deduction',
    id: bigint,
    previousStatus: string,
    currentStatus: string,
    url: string
  ) {
    logger.info('MailService.ts: sending status changed email');

    try {
      await emailServiceClient.sendEmail({
        to: userEmail,
        language,
        template: 'StatusChanged',
        variables: {
          user: {
            name: userDisplayName
          },
          type,
          id,
          previousStatus,
          currentStatus,
          url
        }
      });
    } catch (err) {
      Sentry.captureException(err);
      logger.error(`MailService.ts: There was an error contacting the email service. ${err}`);
    }
  }

  async sendReferralMail(
    userDisplayName: string,
    language: Language,
    recipientEmail: string,
    message: string,
    url: string
  ) {
    logger.info('MailService.ts: sending referral email');

    try {
      await emailServiceClient.sendEmail({
        to: recipientEmail,
        language,
        template: 'Referral',
        variables: {
          user: {
            name: userDisplayName
          },
          message,
          url
        }
      });
    } catch (err) {
      Sentry.captureException(err);
      logger.error(`MailService.ts: There was an error contacting the email service. ${err}`);
    }
  }
}
