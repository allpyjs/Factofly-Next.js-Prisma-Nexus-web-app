import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import CardHeaderIcon from '~/features/shared/components/CardHeaderIcon';
import { CustomerDetailsQuery_customer as CustomerType } from './graphql/.generated/CustomerDetailsQuery';
import { toDateString } from '../../../../utils/formatDate';
import useUser from '~/contexts/User/useUser';

type DetailsCardProps = {
  customer: CustomerType;
};

type CustomerCardItemProps = {
  label: string;
  value: JSX.Element | string | number | null | undefined;
};

function CustomerCardItem({ label, value }: CustomerCardItemProps) {
  return (
    <div className="card-item row g-1">
      <span className="label fw-bold col text-end">{label}:</span> <span className="value col">{value}</span>
    </div>
  );
}

function CustomerCard({ customer }: DetailsCardProps): JSX.Element {
  const { isAdmin } = useUser();
  const { t } = useTranslation('customers');

  return (
    <div className="card">
      {customer?.contact && (
        <div className="card-header p-0">
          <h3 className="m-0">
            <CardHeaderIcon icon="uil-building" /> {t('headers.contact')}: {customer?.contact}
          </h3>
        </div>
      )}
      <div className="card-body">
        <div className="row">
          <div className="col-4">
            <div className="px-3">
              {isAdmin && (
                <>
                  <i className="uil-user" />
                  <Link href={`/admin/users/${customer?.user.id}`}>
                    <a>{customer?.user.displayName}</a>
                  </Link>
                  <br />
                </>
              )}
              <i className="uil-envelope" />{' '}
              <a href={`mailto:${customer?.email}`} target="_blank" rel="noreferrer">
                {customer?.email}
              </a>
              <br />
              <i className="uil-phone" />{' '}
              <a href={`tel:${customer?.phoneNumber}`} target="_blank" rel="noreferrer">
                {customer?.phoneNumber}
              </a>
              <br />
              <i className="uil-calender" /> {toDateString(customer?.createdDate)}
            </div>
          </div>
          <div className="col-4 address">
            <div className="row g-1">
              <div className="col text-end">
                <span className="label fw-bold">{t('labels.address')}: </span>
              </div>
              <div className="col">
                {customer?.address.address}
                <br />
                {customer?.address.city}
                <br />
                {customer?.address.postalCode}
                <br />
                {customer?.address.country.name_en}
              </div>
            </div>
          </div>
          <div className="col-4 payment-info">
            <CustomerCardItem label={t('labels.addressLookup.vatId.dk')} value={customer?.vatId} />
            <CustomerCardItem label={t('labels.ean')} value={customer?.ean} />
            <CustomerCardItem label={t('labels.paymentDueDays')} value={customer?.paymentDueDays} />
            {isAdmin && (
              <CustomerCardItem label={t('labels.economicCustomerId')} value={customer?.economicCustomerId} />
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        i {
          margin-right: 3px;
        }
      `}</style>
    </div>
  );
}

export default CustomerCard;
