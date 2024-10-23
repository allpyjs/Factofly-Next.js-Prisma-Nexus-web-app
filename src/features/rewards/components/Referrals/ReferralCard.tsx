import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { toDateString } from '~/utils/formatDate';

export type ReferralCardProps = {
  referral: any;
};

export default function ReferralCard({ referral }: ReferralCardProps) {
  const { t } = useTranslation('rewards');
  return (
    <div className="card mb-2 border">
      <div className={classNames('card-body p-2')}>
        <div className="row">
          <div className="col-6">
            <i
              className={classNames('uil fs-4 align-middle me-2', {
                'text-success': referral.status === 'PAID_INVOICE',
                'uil-check-circle': referral.status === 'PAID_INVOICE',
                'text-warning': referral.status !== 'PAID_INVOICE',
                'uil-times-circle': referral.status !== 'PAID_INVOICE'
              })}
            />
            {referral.email}
          </div>
          <div className="col-3">
            <i className="uil uil-calendar-alt" /> {toDateString(referral.createdDate)}
          </div>
          <div className="col-3">{t(`referralStatus.${referral.status}`)}</div>
        </div>
      </div>
    </div>
  );
}
