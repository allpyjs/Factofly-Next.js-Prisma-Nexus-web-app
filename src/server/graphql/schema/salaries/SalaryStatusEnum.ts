import { enumType } from 'nexus';
import { salaryStatusesKeys } from './salaryStatuses';

export const SalaryStatusEnum = enumType({
  name: 'SalaryStatusEnum',
  members: salaryStatusesKeys,
  description: 'Allowed salary statuses'
});

export default SalaryStatusEnum;
