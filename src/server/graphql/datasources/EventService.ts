import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { IContextData } from '../IContextData';
import apiConfig from '~/apiConfig';
import stringify from '~/utils/stringify';
import logger from '~/utils/logger';

type EventToUrlMap = {
  [key: string]: (data: any) => string;
};

const eventToUrlMap: EventToUrlMap = {
  'customer-created': ({ customerId }: any) => `/customers/${customerId}`,
  'task-created': ({ taskId }: any) => `/tasks/${taskId}`,
  'deduction-created': ({ deductionId }: any) => `/deductions/${deductionId}`,
  'invoice-created': ({ invoiceId }: any) => `/invoices/${invoiceId}`,
  'coop-agreement-created': ({ cooperationAgreementId }: any) => `/cooperations/${cooperationAgreementId}`
};

async function sendEventToIntercom(name: string, userId: number, data: any) {
  await fetch('https://api.intercom.io/events', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiConfig.intercom.accessToken}`,
      'Content-Type': 'application/json'
    },
    body: stringify({
      event_name: name,
      created_at: Math.round(Date.now() / 1000),
      user_id: userId,
      metadata: {
        link: eventToUrlMap[name] ? apiConfig.baseUrl + eventToUrlMap[name](data) : undefined,
        ...data
      }
    })
  });
}

export default class EventService extends DataSource {
  context!: IContextData;

  async initialize(config: DataSourceConfig<IContextData>): Promise<void> {
    this.context = config.context;
  }

  async recordEvent(name: string, data: any) {
    logger.info(`EventService.ts: recorded ${name} event for userId=${this.context.user?.id}`);
    await sendEventToIntercom(name, Number(this.context.user?.id), data);
  }
}
