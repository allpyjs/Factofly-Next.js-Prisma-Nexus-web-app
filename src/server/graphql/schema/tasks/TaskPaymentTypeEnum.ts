import { enumType } from 'nexus';

export const taskPaymentTypes = {
  PER_HOUR: 'PER_HOUR',
  PROJECT_PRICE: 'PROJECT_PRICE'
};

export const taskPaymentTypesKeys: (keyof typeof taskPaymentTypes)[] = Object.keys(
  taskPaymentTypes
) as (keyof typeof taskPaymentTypes)[];

export const TaskPaymentTypeEnum = enumType({
  name: 'TaskPaymentTypeEnum',
  members: taskPaymentTypesKeys,
  description: 'Allowed task payment types'
});

export default TaskPaymentTypeEnum;
