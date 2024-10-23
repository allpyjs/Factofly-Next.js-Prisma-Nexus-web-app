import { enumType } from 'nexus';

export const CustomerTypeEnum = enumType({
  name: 'CustomerTypeEnum',
  members: ['PRIVATE', 'BUSINESS'],
  description: 'Type of customer'
});

export default CustomerTypeEnum;
