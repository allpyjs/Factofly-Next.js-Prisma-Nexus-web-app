export const salaryStatuses = {
  DRAFT: 'DRAFT',
  SENT: 'SENT',
  PAID: 'PAID'
};

export const salaryStatusesKeys: (keyof typeof salaryStatuses)[] = Object.keys(
  salaryStatuses
) as (keyof typeof salaryStatuses)[];
