import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { CustomerTypeEnum } from '../../../.generated/globalTypes';

type CustomerTypeProps = {
  type: CustomerTypeEnum;
  className?: string;
};
function CustomerTypeBadge({ type, className = undefined }: CustomerTypeProps) {
  const { t } = useTranslation('customers');
  return type === CustomerTypeEnum.BUSINESS ? (
    <span className={classNames('badge bg-success', className)}>
      {t('customerTypes.company').toLowerCase()}
    </span>
  ) : (
    <span className={classNames('badge bg-primary', className)}>
      {t('customerTypes.person').toLowerCase()}
    </span>
  );
}

export default CustomerTypeBadge;
