import { Language } from '@prisma/client';
import apiConfig from '~/apiConfig';
import sendServiceMessage from './sendServiceMessage';

type SendEmailArgs = {
  to: string;
  language: Language;
  template: string;
  variables: any;
};

async function sendEmail({ to, language, template, variables }: SendEmailArgs) {
  await sendServiceMessage('send-email', apiConfig.email.snsTopicArn, `email-${to}`, {
    to,
    language,
    template,
    variables
  });
}

export default { sendEmail };
