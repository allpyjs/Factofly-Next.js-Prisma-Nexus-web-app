import { inputObjectType } from 'nexus';

export const ReferralStatusFilter = inputObjectType({
  name: 'ReferralStatusFilter',
  definition(t) {
    t.field('equals', { type: 'ReferralStatusEnum' });
    t.list.nonNull.field('in', { type: 'ReferralStatusEnum' });
    t.list.nonNull.field('notIn', { type: 'ReferralStatusEnum' });
    t.field('not', { type: 'ReferralStatusEnum' });
  }
});

export default ReferralStatusFilter;
