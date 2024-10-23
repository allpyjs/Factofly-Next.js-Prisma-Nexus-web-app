import { inputObjectType } from 'nexus';

export const DeductionStatusFilter = inputObjectType({
  name: 'DeductionStatusFilter',
  definition(t) {
    t.field('equals', { type: 'DeductionStatusEnum' });
    t.list.nonNull.field('in', { type: 'DeductionStatusEnum' });
    t.list.nonNull.field('notIn', { type: 'DeductionStatusEnum' });
    t.field('not', { type: 'DeductionStatusEnum' });
  }
});

export default DeductionStatusFilter;
