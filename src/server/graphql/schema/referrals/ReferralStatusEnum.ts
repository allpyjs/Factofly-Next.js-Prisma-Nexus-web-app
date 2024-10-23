import { enumType } from 'nexus';

export const referralStatuses = {
  NONE: 'NONE',
  SIGNED_UP: 'SIGNED_UP',
  SENT_INVOICE: 'SENT_INVOICE',
  PAID_INVOICE: 'PAID_INVOICE'
};

export const referralStatusesKeys: (keyof typeof referralStatuses)[] = Object.keys(
  referralStatuses
) as (keyof typeof referralStatuses)[];

export const ReferralStatusEnum = enumType({
  name: 'ReferralStatusEnum',
  members: referralStatusesKeys,
  description: 'Allowed referral statuses'
});

export default ReferralStatusEnum;
