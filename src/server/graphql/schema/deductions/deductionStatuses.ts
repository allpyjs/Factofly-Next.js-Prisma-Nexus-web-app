export const deductionStatuses = {
  DRAFT: 'DRAFT',
  SENT: 'SENT',
  APPROVED: 'APPROVED',
  DECLINED: 'DECLINED',
  DELETED_BY_USER: 'DELETED_BY_USER'
};

export const deductionStatusKeys: (keyof typeof deductionStatuses)[] = Object.keys(
  deductionStatuses
) as (keyof typeof deductionStatuses)[];
