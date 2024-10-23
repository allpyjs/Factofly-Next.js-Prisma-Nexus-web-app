import { TaskPaymentTypeEnum, TaskStatusEnum } from '../../../../.generated/globalTypes';

export type EditTaskFormData = {
  customerId?: bigint;
  title?: string;
  reference?: string;
  jobTypeId?: bigint;
  startDate?: Date;
  endDate?: Date;
  expectedHours?: number;
  status: TaskStatusEnum;
  termsAccepted: boolean;
  userId?: bigint;

  paymentType?: TaskPaymentTypeEnum;
  paymentAmount?: number;
  description?: string;
};
