import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import languages from '~/constants/languages';
import useUser from '~/contexts/User/useUser';
import CustomerTypeBadge from '~/features/customers/components/CustomerTypeBadge';
import SectionHeader from '~/features/forms/components/SectionHeader';
import CardHeaderIcon from '~/features/shared/components/CardHeaderIcon';
import CardItem from '~/features/shared/components/CardItem';
import DetailsCardSection from '~/features/shared/components/DetailsCardSection';
import formatCurrency from '~/utils/formatCurrency';
import { toDateString } from '~/utils/formatDate';
import InvoiceStatusBadge from '../InvoiceStatusBadge';
import { InvoiceDetailsQuery_invoice as InvoiceType } from './graphql/.generated/InvoiceDetailsQuery';

type InvoiceCardProps = {
  invoice: InvoiceType;
};

function getDiscount(invoice: InvoiceType, t: any) {
  if (invoice.creditsUsed) {
    switch (invoice.discountType) {
      case 'FIXED':
        return formatCurrency(invoice.discountValue, 'da', 'dkk');
      case 'PERCENTAGE':
        return t('messages.percentageDiscount', {
          value: invoice.discountValue,
          max: formatCurrency(invoice.discountMaxValue, 'da', 'dkk')
        });
      default:
        return null;
    }
  }
  return null;
}

function InvoiceCard({ invoice }: InvoiceCardProps): JSX.Element {
  const { t } = useTranslation('invoices');
  const { t: tRewards } = useTranslation('rewards');
  const { isAdmin, language } = useUser();

  const paymentPerHour = formatCurrency(invoice.totalPrice / invoice.hoursWorked, 'dk', invoice.currency);

  const discount = getDiscount(invoice, tRewards);

  return (
    <div className="card invoice-details-card">
      <div className="card-header p-0 pe-2">
        <InvoiceStatusBadge className="float-end my-2 ms-1" status={invoice?.status} />
        <h3 className="m-0">
          <CardHeaderIcon icon="uil-clipboard-notes" />{' '}
          {isAdmin ? `${invoice?.visibleId}/${invoice?.id}` : invoice?.visibleId}: {invoice?.customer.name}
        </h3>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col">
            <DetailsCardSection>
              <SectionHeader title={t('headers.invoiceInformation')} />
              <div className="row">
                <div className="col">
                  {isAdmin && (
                    <CardItem
                      label={t('labels.user')}
                      value={
                        <Link href={`/admin/users/${invoice?.user.id}`}>
                          <a>
                            {invoice?.user.displayName}{' '}
                            <span className="badge bg-light text-dark">id: {invoice?.user.id}</span>
                          </a>
                        </Link>
                      }
                    />
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <CardItem
                    label={t('labels.hoursWorked')}
                    value={`${invoice?.hoursWorked} (${paymentPerHour} ${t('messages.perHour')})`}
                  />
                  <CardItem label={t('labels.includeVat')} value={invoice?.includeVat} />
                  <CardItem label={t('labels.earlyPayment')} value={invoice.earlyPayment} />
                </div>
                <div className="col">
                  <CardItem label={t('labels.invoiceDate')} value={toDateString(invoice?.invoiceDate)} />
                  <CardItem label={t('labels.startDate')} value={toDateString(invoice?.startDate)} />
                  <CardItem label={t('labels.endDate')} value={toDateString(invoice?.endDate)} />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {invoice?.jobType && (
                    <CardItem
                      label={t('labels.jobType')}
                      value={
                        language === languages.EN ? invoice?.jobType?.name_en : invoice?.jobType?.name_da
                      }
                    />
                  )}
                  {isAdmin && discount && <CardItem label={t('labels.discount')} value={discount} />}
                  {isAdmin && (
                    <CardItem label={t('labels.economicInvoiceId')} value={invoice.economicInvoiceId} />
                  )}
                </div>
                <div className="col">
                  {isAdmin && (
                    <CardItem
                      label={t('labels.paidAmount')}
                      value={formatCurrency(invoice.paidAmountDkk, 'dk', 'dkk')}
                    />
                  )}
                </div>
              </div>
            </DetailsCardSection>
          </div>
          <div className="col">
            <DetailsCardSection>
              <SectionHeader title={t('headers.customer')} />
              <CardItem
                label={t('labels.customerName')}
                value={
                  <>
                    <Link href={`/customers/${invoice?.customer.id}`}>
                      <a>{invoice?.customer.name}</a>
                    </Link>
                    <CustomerTypeBadge className="ms-2" type={invoice?.customer.type} />
                    <span className="badge bg-light text-dark ms-1">id: {invoice?.customer.id}</span>
                  </>
                }
              />
              <CardItem label={t('labels.customerContact')} value={invoice.customerContact} />
              <CardItem
                label={t('labels.customerEmail')}
                value={
                  <a href={`mailto:${invoice?.customerEmail}`} target="_blank" rel="noreferrer">
                    {invoice?.customerEmail}
                  </a>
                }
              />
              {invoice.sendInvoiceCopyTo && (
                <>
                  <span className="label">{t('labels.sendInvoiceCopyTo')}:</span>{' '}
                  <a href={`mailto:${invoice?.sendInvoiceCopyTo}`} target="_blank" rel="noreferrer">
                    {invoice?.sendInvoiceCopyTo}
                  </a>
                  <br />
                </>
              )}
              <CardItem
                label={t('labels.customerAddress')}
                value={
                  <>
                    {invoice?.customerAddress}&nbsp;
                    {invoice?.customerCity},&nbsp;
                    {invoice?.customerPostalCode}
                  </>
                }
              />
              <CardItem label={t('labels.paymentDueDays')} value={invoice.paymentDueDays} />
            </DetailsCardSection>
          </div>
        </div>
      </div>
      <style jsx>{`
        i {
          margin-right: 3px;
        }
        .invoice-details-card {
          // TODO: Not sure why this is necessary, but if it's not used then the card isn't sized properly
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export default InvoiceCard;
