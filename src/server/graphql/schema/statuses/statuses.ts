import { NexusGenEnums } from '../../.generated/nexus-typegen';

interface StatusType {
  id: NexusGenEnums['StatusEnum'];
  description: string;
  openStatus: boolean;
  completedStatus: boolean;
  invoicedStatus: boolean;
  taskStatus: boolean;
  invoiceStatus: boolean;
}

export const statuses: Record<NexusGenEnums['StatusEnum'], StatusType> = {
  DRAFT: {
    id: 'DRAFT',
    description: 'Draft',
    openStatus: false,
    completedStatus: false,
    invoicedStatus: false,
    taskStatus: true,
    invoiceStatus: true
  },
  SENT: {
    id: 'SENT',
    description: 'Sent',
    openStatus: true,
    completedStatus: false,
    invoicedStatus: true,
    taskStatus: true,
    invoiceStatus: true
  },
  PENDING: {
    id: 'PENDING',
    description: 'Pending',
    openStatus: true,
    completedStatus: false,
    invoicedStatus: false,
    taskStatus: true,
    invoiceStatus: true
  },
  MORE_INFO_NEEDED: {
    id: 'MORE_INFO_NEEDED',
    description: 'More info needed',
    openStatus: true,
    completedStatus: false,
    invoicedStatus: false,
    taskStatus: true,
    invoiceStatus: false
  },
  DENIED: {
    id: 'DENIED',
    description: 'Denied',
    openStatus: false,
    completedStatus: true,
    invoicedStatus: false,
    taskStatus: true,
    invoiceStatus: false
  },
  APPROVED: {
    id: 'APPROVED',
    description: 'Approved',
    openStatus: false,
    completedStatus: true,
    invoicedStatus: false,
    taskStatus: true,
    invoiceStatus: false
  },
  SENT_TO_COMPANY: {
    id: 'SENT_TO_COMPANY',
    description: 'Sent to company',
    openStatus: true,
    completedStatus: false,
    invoicedStatus: true,
    taskStatus: false,
    invoiceStatus: true
  },
  LATE_PAYMENT: {
    id: 'LATE_PAYMENT',
    description: 'Late payment',
    openStatus: true,
    completedStatus: false,
    invoicedStatus: true,
    taskStatus: false,
    invoiceStatus: true
  },
  DEBT_COLLECTION: {
    id: 'DEBT_COLLECTION',
    description: 'Debt collection',
    openStatus: true,
    completedStatus: false,
    invoicedStatus: true,
    taskStatus: false,
    invoiceStatus: true
  },
  COMPANY_DISPUTE: {
    id: 'COMPANY_DISPUTE',
    description: 'Company dispute',
    openStatus: true,
    completedStatus: false,
    invoicedStatus: true,
    taskStatus: false,
    invoiceStatus: true
  },
  PAID: {
    id: 'PAID',
    description: 'Paid',
    openStatus: false,
    completedStatus: true,
    invoicedStatus: true,
    taskStatus: false,
    invoiceStatus: true
  },
  CANCELLED: {
    id: 'CANCELLED',
    description: 'Cancelled',
    openStatus: false,
    completedStatus: true,
    invoicedStatus: false,
    taskStatus: false,
    invoiceStatus: true
  },
  DENIED_BY_COMPANY: {
    id: 'DENIED_BY_COMPANY',
    description: 'Denied by company',
    openStatus: false,
    completedStatus: true,
    invoicedStatus: false,
    taskStatus: false,
    invoiceStatus: true
  },
  SALARY_PAID: {
    id: 'SALARY_PAID',
    description: 'Salary paid',
    openStatus: false,
    completedStatus: true,
    invoicedStatus: true,
    taskStatus: false,
    invoiceStatus: true
  }
};

export const statusesKeys: (keyof typeof statuses)[] = Object.keys(statuses) as (keyof typeof statuses)[];

export const openStatusesKeys: (keyof typeof statuses)[] = Object.keys(statuses).filter(
  (key) => statuses[key as keyof typeof statuses].openStatus
) as (keyof typeof statuses)[];

export const completedStatusesKeys: (keyof typeof statuses)[] = Object.keys(statuses).filter(
  (key) => statuses[key as keyof typeof statuses].completedStatus
) as (keyof typeof statuses)[];

export const invoicedStatusesKeys: (keyof typeof statuses)[] = Object.keys(statuses).filter(
  (key) => statuses[key as keyof typeof statuses].invoicedStatus
) as (keyof typeof statuses)[];
