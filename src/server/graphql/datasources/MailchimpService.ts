import { DataSource } from 'apollo-datasource';
import apiConfig from '~/apiConfig';
import sendServiceMessage from '~/server/services/sendServiceMessage';

export default class MailchimpService extends DataSource {
  async update(userId: number | BigInt) {
    await sendServiceMessage(
      'update-mailchimp',
      apiConfig.services.applicationServiceTopicArn,
      `email-${userId}`,
      {
        userId
      }
    );
  }
}
