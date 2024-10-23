import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { DeductionStatusEnum } from '../../../.generated/globalTypes';

type DeductionStatusProps = {
  status: DeductionStatusEnum;
  className?: string;
};

const getStatusColor = (status: DeductionStatusEnum) => {
  switch (status) {
    case DeductionStatusEnum.APPROVED:
      return 'bg-success';
    case DeductionStatusEnum.DELETED_BY_USER:
      return 'bg-secondary';
    case DeductionStatusEnum.DECLINED:
      return 'bg-danger';
    default:
      return 'bg-primary';
  }
};

function DeductionStatusBadge({ status, className = undefined }: DeductionStatusProps) {
  const { t } = useTranslation('deductions');

  return (
    <span className={classNames('badge', getStatusColor(status), className)}>
      {t(`statuses.${status}`).toLowerCase()}
    </span>
  );
}

export default DeductionStatusBadge;
