import { enumType } from 'nexus';
import { deductionStatusKeys } from './deductionStatuses';

export const DeductionStatusEnum = enumType({
  name: 'DeductionStatusEnum',
  members: deductionStatusKeys,
  description: 'Allowed deduction statuses'
});

export default DeductionStatusEnum;
