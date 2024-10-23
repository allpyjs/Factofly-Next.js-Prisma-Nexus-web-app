import { inputObjectType } from 'nexus';

export const SalaryStatusFilter = inputObjectType({
  name: 'SalaryStatusFilter',
  definition(t) {
    t.field('equals', { type: 'SalaryStatusEnum' });
    t.list.nonNull.field('in', { type: 'SalaryStatusEnum' });
    t.list.nonNull.field('notIn', { type: 'SalaryStatusEnum' });
    t.field('not', { type: 'SalaryStatusEnum' });
  }
});

export default SalaryStatusFilter;
