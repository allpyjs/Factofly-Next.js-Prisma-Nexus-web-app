import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { TaskStatusEnum } from '../../../.generated/globalTypes';

type TaskStatusProps = {
  status: TaskStatusEnum;
  className?: string;
};

const getStatusColor = (status: TaskStatusEnum) => {
  switch (status) {
    case TaskStatusEnum.APPROVED:
      return 'bg-success';
    case TaskStatusEnum.DENIED:
      return 'bg-danger';
    default:
      return 'bg-primary';
  }
};

function TaskStatusBadge({ status, className = undefined }: TaskStatusProps) {
  const { t } = useTranslation('tasks');

  return (
    <span className={classNames('badge', getStatusColor(status), className)}>
      {t(`statuses.${status}`).toLowerCase()}
    </span>
  );
}

export default TaskStatusBadge;
