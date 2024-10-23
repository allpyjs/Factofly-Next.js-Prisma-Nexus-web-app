import { enumType } from 'nexus';

export const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc']
});

export default SortOrder;
