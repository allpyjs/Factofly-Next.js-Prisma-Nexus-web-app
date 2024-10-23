import { TaskPaymentTypeEnum, TaskStatusEnum } from '~/.generated/globalTypes';

export type CreateTaskFormData = {
  customerId?: bigint;
  title?: string;
  reference?: string;
  jobTypeId?: bigint;
  startDate?: Date;
  endDate?: Date;
  expectedHours?: number;
  status: TaskStatusEnum;
  termsAccepted: boolean;
  createAsUserId?: number;

  paymentType?: TaskPaymentTypeEnum;
  paymentAmount?: number;
  description?: string;
};
