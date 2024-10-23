export const taskStatuses = {
  DRAFT: 'DRAFT',
  SENT: 'SENT',
  PENDING: 'PENDING',
  MORE_INFO_NEEDED: 'MORE_INFO_NEEDED',
  DENIED: 'DENIED',
  APPROVED: 'APPROVED'
};

export const taskStatusesKeys: (keyof typeof taskStatuses)[] = Object.keys(
  taskStatuses
) as (keyof typeof taskStatuses)[];
