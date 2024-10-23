import { DataSource } from 'apollo-datasource';
import logger from '~/utils/logger';
import sendServiceMessage from '../../services/sendServiceMessage';
import apiConfig from '../../../apiConfig';
import FeatureService, { FEATURES } from './FeatureService';

const SEND_EMPLOYEE = 'send-employee';
const SEND_SALARY = 'send-salary';
const UPDATE_SALARY = 'update-salary';

const errorMessage = 'PayrollService.ts: There was an error contacting the payroll service.';

export default class PayrollService extends DataSource {
  featureService!: FeatureService;

  constructor(featureService: FeatureService) {
    super();
    this.featureService = featureService;
  }

  async sendEmployee(userId: bigint) {
    if (!this.featureService.featureEnabled(FEATURES.PAYROLL_SYNC)) return;

    try {
      await sendServiceMessage(SEND_EMPLOYEE, apiConfig.services.payrollServiceTopicArn, `user-${userId}`, {
        userId
      });
    } catch (err) {
      logger.error(`${errorMessage} ${err}`);
    }
  }

  async updateSalary(salaryId: bigint) {
    if (!this.featureService.featureEnabled(FEATURES.PAYROLL_SYNC)) return;

    try {
      await sendServiceMessage(
        UPDATE_SALARY,
        apiConfig.services.payrollServiceTopicArn,
        `update-salary-${salaryId}`,
        {
          salaryId
        }
      );
    } catch (err) {
      logger.error(`${errorMessage} ${err}`);
    }
  }

  async sendSalary(salaryId: bigint) {
    if (!this.featureService.featureEnabled(FEATURES.PAYROLL_SYNC)) return;

    try {
      await sendServiceMessage(
        SEND_SALARY,
        apiConfig.services.payrollServiceTopicArn,
        `send-salary-${salaryId}`,
        {
          salaryId
        }
      );
    } catch (err) {
      logger.error(`${errorMessage} ${err}`);
    }
  }
}
