import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';
import CardItem from '~/features/shared/components/CardItem';
import { SalaryViewUserDetailsQuery_user as SalaryViewUserType } from './SalaryView/graphql/.generated/SalaryViewUserDetailsQuery';
import { SalaryCompleteViewQuery_salary_user as SalaryCompleteViewUserType } from './SalaryCompleteView/graphql/.generated/SalaryCompleteViewQuery';

type SalaryUserDetailsCardProps = {
  user:
    | SalaryViewUserType
    | (SalaryCompleteViewUserType & {
        taxInfo?: any;
        bankAccount?: any;
        taxInfoHidden?: any;
        bankAccountHidden?: any;
      });
};

export default function SalaryUserDetailsCard({ user }: SalaryUserDetailsCardProps) {
  const { t } = useTranslation('users');
  const [showDetails, setDetails] = useState(false);

  const toggleDetails = useCallback(() => {
    setDetails(!showDetails);
  }, [setDetails, showDetails]);

  return (
    <div className="card user-card">
      <div className="card-header p-1 fs-4 fw-bold">
        <span className="badge bg-dark me-1">{`${user.id}`}</span>
        <span>{user.displayName}</span>
        {(!!user.taxInfo || !!user.bankAccount) && (
          <button type="button" className="btn btn-light btn-sm float-end" onClick={toggleDetails}>
            {showDetails ? <i className="uil-eye-slash" /> : <i className="uil-eye" />}
          </button>
        )}
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <CardItem label={t('labels.name')} value={user.displayName} />
            <CardItem
              label={t('labels.address')}
              value={
                <>
                  {user.address?.address}, {user.address?.city}, {user.address?.postalCode},{' '}
                  {user.address?.country.name_en}
                </>
              }
            />
            <CardItem label={t('labels.language')} value={user.language} />
          </div>
          <div className="col-3">
            <CardItem label={t('labels.email')} value={<a href={`mailto: ${user.email}`}>{user.email}</a>} />

            {user.taxInfo && (
              <CardItem
                label={t('labels.personId.dk')}
                value={showDetails ? user.taxInfo.personId : user.taxInfoHidden.personId}
              />
            )}
            {user.bankAccount && (
              <CardItem
                label={t('labels.bankRegistration')}
                value={
                  showDetails ? user.bankAccount.bankRegistration : user.bankAccountHidden.bankRegistration
                }
              />
            )}
          </div>
          <div className="col-3">
            <CardItem
              label={t('labels.phoneNumber')}
              value={<a href={`tel: ${user.phoneNumber}`}>{user.phoneNumber}</a>}
            />
            {user.taxInfo && (
              <CardItem
                label={t('labels.taxCard')}
                value={showDetails ? user.taxInfo.taxCard : user.taxInfoHidden.taxCard}
              />
            )}

            {user.bankAccount && (
              <CardItem
                label={t('labels.bankAccount')}
                value={showDetails ? user.bankAccount.bankAccount : user.bankAccountHidden.bankAccount}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
