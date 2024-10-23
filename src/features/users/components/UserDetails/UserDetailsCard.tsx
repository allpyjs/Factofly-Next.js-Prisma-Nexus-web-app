import { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import CardHeaderIcon from '~/features/shared/components/CardHeaderIcon';
import { UserDetailsQuery_user as UserType } from './graphql/.generated/UserDetailsQuery';
import { toDateString } from '../../../../utils/formatDate';
import CardItem from '~/features/shared/components/CardItem';

type DetailsCardProps = {
  user: UserType;
};

function UserCard({ user }: DetailsCardProps): JSX.Element {
  const { t } = useTranslation('users');
  const [showDetails, setDetails] = useState(false);

  const toggleDetails = useCallback(() => {
    setDetails(!showDetails);
  }, [setDetails, showDetails]);
  return (
    <div className="card">
      <div className="card-header p-0">
        <h3 className="m-0">
          <CardHeaderIcon icon="uil-user" /> {user?.id}: {user?.displayName}
        </h3>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md">
            <div className="px-3">
              <i className="uil-envelope" />{' '}
              <a href={`mailto:${user?.email}`} target="_blank" rel="noreferrer">
                {user?.email}
              </a>
              <br />
              <i className="uil-phone" />{' '}
              {user?.phoneNumber ? (
                <a href={`tel:${user?.phoneNumber}`} target="_blank" rel="noreferrer">
                  {user?.phoneNumber}
                </a>
              ) : (
                'not provided'
              )}
              <br />
              <i className="uil-calender" title="created date" /> {toDateString(user?.createdDate)}
              <br />
              <i className="uil-share-alt" title="referral" /> {user?.referral ?? 'none'}
              <br />
              <br />
              {user?.address && (
                <CardItem
                  label={t('labels.address')}
                  value={
                    <>
                      {user?.address?.address}, {user?.address?.city}, {user?.address?.postalCode},{' '}
                      {user?.address?.country.name_en}
                    </>
                  }
                />
              )}
            </div>
          </div>
          <div className="col-md address">
            <CardItem
              label={t('labels.economicCustomerGroupId')}
              value={user?.economicCustomerGroupId ?? 'none'}
            />
            <CardItem label={t('labels.economicEmployeeId')} value={user?.economicEmployeeId ?? 'none'} />
            <CardItem label={t('labels.vacationPayment')} value={user?.vacationPayment} />
          </div>
          {user?.bankAccount?.bankAccount && showDetails && (
            <>
              <div className="col-md">
                <CardItem label={t('labels.bankName')} value={user?.bankAccount?.bankName} />
                <CardItem label={t('labels.bankRegistration')} value={user?.bankAccount?.bankRegistration} />
                <CardItem label={t('labels.bankAccount')} value={user?.bankAccount?.bankAccount} />
              </div>
              <div className="col-md">
                <button type="button" className="btn btn-light btn-sm float-end" onClick={toggleDetails}>
                  {showDetails ? <i className="uil-eye-slash" /> : <i className="uil-eye" />}
                </button>
                <CardItem label={t('labels.taxCard')} value={user?.taxInfo?.taxCard} />
                <CardItem label={t('labels.personId.dk')} value={user?.taxInfo?.personId} />
              </div>
            </>
          )}
          {user?.bankAccount?.bankAccount && !showDetails && (
            <>
              <div className="col-md">
                <CardItem label={t('labels.bankName')} value={user?.bankAccountHidden?.bankName} />
                <CardItem
                  label={t('labels.bankRegistration')}
                  value={user?.bankAccountHidden?.bankRegistration}
                />
                <CardItem label={t('labels.bankAccount')} value={user?.bankAccountHidden?.bankAccount} />
              </div>
              <div className="col-md">
                <button type="button" className="btn btn-light btn-sm float-end" onClick={toggleDetails}>
                  {showDetails ? <i className="uil-eye-slash" /> : <i className="uil-eye" />}
                </button>
                <CardItem label={t('labels.taxCard')} value={user?.taxInfoHidden?.taxCard} />
                <CardItem label={t('labels.personId.dk')} value={user?.taxInfoHidden?.personId} />
              </div>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        i {
          margin-right: 3px;
        }
        .label {
          font-weight: bold;
          display: inline-block;
          text-align: right;
        }
        .address div,
        .bank-details div {
          display: inline-block;
          vertical-align: top;
        }
      `}</style>
    </div>
  );
}

export default UserCard;
