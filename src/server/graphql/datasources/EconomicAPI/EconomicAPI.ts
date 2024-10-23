import { RequestOptions } from 'apollo-datasource-rest';
import logger from '~/utils/logger';
import sendServiceMessage from '../../../services/sendServiceMessage';
import apiConfig from '../../../../apiConfig';
import RESTDataSource from '../RESTDataSource';

export default class EconomicAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = apiConfig.economic.baseUrl;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('X-AppSecretToken', apiConfig.economic.secretToken!);
    request.headers.set('X-AgreementGrantToken', apiConfig.economic.agreementToken!);
    request.headers.set('Content-Type', 'application/json');
  }

  async sendInvoiceToEconomic(invoiceId: bigint) {
    try {
      await sendServiceMessage('send-invoice', apiConfig.economic.snsTopicArn, `invoice-${invoiceId}`, {
        invoiceId
      });
    } catch (err) {
      logger.error(`EconomicAPI.ts: There was an error contacting the economic service. ${err}`);
    }
  }

  async createFeeInvoiceForSalary(salaryId: bigint) {
    try {
      await sendServiceMessage('send-fee-invoice', apiConfig.economic.snsTopicArn, `salary-${salaryId}`, {
        salaryId
      });
    } catch (err) {
      logger.error(`EconomicAPI.ts: There was an error contacting the economic service. ${err}`);
    }
  }
}
