import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { InvoiceStatusEnum } from '../../../.generated/globalTypes';

type InvoiceStatusProps = {
  status: InvoiceStatusEnum;
  className?: string;
};

const getStatusColor = (status: InvoiceStatusEnum) => {
  switch (status) {
    case InvoiceStatusEnum.PAID:
    case InvoiceStatusEnum.SALARY_PAID:
      return 'bg-success';
    case InvoiceStatusEnum.CANCELLED:
      return 'bg-secondary';
    case InvoiceStatusEnum.LATE_PAYMENT:
      return 'bg-danger';
    default:
      return 'bg-primary';
  }
};

function InvoiceStatusBadge({ status, className = undefined }: InvoiceStatusProps) {
  const { t } = useTranslation('invoices');

  const statuses = t(`statuses.${status}`).toLowerCase().split(' - ');

  return (
    <>
      {statuses.map((subStatus) => (
        <span key={subStatus} className={classNames('badge', getStatusColor(status), className)}>
          {subStatus}
        </span>
      ))}
    </>
  );
}

export default InvoiceStatusBadge;
