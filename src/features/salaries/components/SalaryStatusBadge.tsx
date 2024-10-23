import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { SalaryStatusEnum } from '../../../.generated/globalTypes';

type SalaryStatusProps = {
  status: SalaryStatusEnum;
  className?: string;
};

const getStatusColor = (status: SalaryStatusEnum) => {
  switch (status) {
    case SalaryStatusEnum.PAID:
      return 'bg-success';
    default:
      return 'bg-primary';
  }
};

function SalaryStatusBadge({ status, className = undefined }: SalaryStatusProps) {
  const { t } = useTranslation('salaries');

  const statuses = t(`statuses.${status}`).toLowerCase().split(' - ');

  return (
    <>
      {statuses.map((subStatus, i) => (
        <span
          key={subStatus}
          className={classNames('badge', { 'ms-1': i > 0 }, getStatusColor(status), className)}
        >
          {subStatus}
        </span>
      ))}
    </>
  );
}

export default SalaryStatusBadge;
