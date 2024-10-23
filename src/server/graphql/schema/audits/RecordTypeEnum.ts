import { enumType } from 'nexus';

export const recordTypes = {
  INVOICE: 'INVOICE',
  INVOICE_LINE: 'INVOICE_LINE',
  TASK: 'TASK',
  CUSTOMER: 'CUSTOMER',
  DEDUCTION: 'DEDUCTION',
  USER: 'USER',
  COOPERATION_AGREEMENT: 'COOPERATION_AGREEMENT',
  SALARY: 'SALARY',
  REWARD: 'REWARD',
  REFERRAL: 'REFERRAL',
  COMPANY: 'COMPANY'
};

export const recordTypesKeys: (keyof typeof recordTypes)[] = Object.keys(
  recordTypes
) as (keyof typeof recordTypes)[];

export const RecordTypeEnum = enumType({
  name: 'RecordTypeEnum',
  members: recordTypesKeys,
  description: 'Allowed invoice statuses'
});

export default RecordTypeEnum;
