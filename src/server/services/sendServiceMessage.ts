import AWS from 'aws-sdk';
import * as Sentry from '@sentry/nextjs';
import apiConfig from '~/apiConfig';
import stringify from '~/utils/stringify';
import logger from '../../utils/logger';

AWS.config.update({ region: apiConfig.aws.region });

export default async function sendServiceMessage(
  event: string,
  topicArn: string,
  messageGroup: string,
  message: any
) {
  const timestamp = new Date().getTime() / 1000;
  const params: AWS.SNS.PublishInput = {
    Subject: event,
    MessageGroupId: messageGroup + timestamp,
    Message: stringify({ event, ...message }),
    TopicArn: topicArn
  };

  try {
    // Create promise and SNS service object
    const data = await new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

    // Handle promise's fulfilled/rejected states
    logger.info(
      `sendServiceMessage.ts: message ${event}(${params.Message}) sent to the topic ${params.TopicArn} [MessageID=${data.MessageId}]`
    );
  } catch (err) {
    Sentry.captureException(err);
    logger.error(err);
  }
}
