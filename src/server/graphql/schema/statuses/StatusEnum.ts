import { enumType } from 'nexus';
import { statusesKeys } from './statuses';

export const StatusEnum = enumType({
  name: 'StatusEnum',
  members: statusesKeys,
  description: 'Both task and invoice statuses'
});

export default StatusEnum;
