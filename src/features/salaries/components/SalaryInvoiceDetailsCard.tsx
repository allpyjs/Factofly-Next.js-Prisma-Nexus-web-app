import { useTranslation } from 'next-i18next';
import useUser from '~/contexts/User/useUser';
import InvoiceStatusBadge from '~/features/invoices/components/InvoiceStatusBadge';
import CardItem from '~/features/shared/components/CardItem';
import formatCurrency from '~/utils/formatCurrency';
import { toDateString } from '~/utils/formatDate';
import { SalaryCompleteViewQuery_salary_invoices as InvoiceType } from './SalaryCompleteView/graphql/.generated/SalaryCompleteViewQuery';

type SalaryInvoiceDetailsCardProps = {
  invoices: InvoiceType[];
  holidayPayment: boolean;
};

export default function SalaryInvoiceDetailsCard({
  holidayPayment,
  invoices
}: SalaryInvoiceDetailsCardProps) {
  const { t } = useTranslation('invoices');
  const { isAdmin } = useUser();

  const hours = invoices?.reduce((prev, current) => prev + current.hoursWorked, 0) ?? 0;
  const total = invoices?.reduce((prev, current) => prev + current.subtotalDkk, 0) ?? 0;
  const totalWithVat = invoices?.reduce(
    (prev, current) => prev + current.subtotalDkk * (current.includeVat ? 1.25 : 1),
    0
  );
  const paidAmountDkk = invoices?.reduce((prev, current) => prev + current.paidAmountDkk, 0);
  const includesVat = !!invoices.find((x) => x.includeVat);
  return (
    <>
      <div className="card invoices-card mb-1">
        <div className="card-body p-3 py-2">
          <div className="row">
            {invoices.length !== 1 && (
              <>
                <div className="col">
                  <CardItem label={t('labels.hours')} value={hours} />
                </div>
                <div className="col">
                  <CardItem label={t('labels.perHour')} value={formatCurrency(total / hours, 'dk', 'dkk')} />
                </div>
                <div className="col">
                  <CardItem label={t('labels.total')} value={formatCurrency(total, 'dk', 'dkk')} />
                </div>
                <div className="col">
                  <CardItem
                    label={t('labels.vat25')}
                    value={includesVat ? formatCurrency(totalWithVat, 'dk', 'dkk') : '-'}
                  />
                </div>
                <div className="col">
                  <CardItem
                    label={t('labels.paidAmount')}
                    value={includesVat ? formatCurrency(paidAmountDkk, 'dk', 'dkk') : '-'}
                  />
                </div>
              </>
            )}
            <div className="col text-end">
              {!holidayPayment && (
                <span className="badge bg-light text-dark ms-1">
                  {t('messages.noVacationPayment').toLowerCase()}
                </span>
              )}
              {holidayPayment && (
                <span className="badge bg-success ms-1">
                  {t('messages.withVacationPayment').toLowerCase()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div>
          {invoices?.map((invoice) => {
            let invoicePerHour = formatCurrency(
              invoice.totalPrice / invoice.hoursWorked,
              'dk',
              invoice.currency
            );
            let invoiceTotal = formatCurrency(invoice.totalPrice, 'dk', invoice.currency);
            let invoiceTotalWithVat = formatCurrency(invoice.totalPriceWithVat, 'dk', invoice.currency);
            const invoicePaidAmountDkk = formatCurrency(invoice.paidAmountDkk ?? 0, 'dk', 'dkk');
            if (invoice.currency.toLowerCase() !== 'dkk') {
              invoicePerHour = `${invoicePerHour} / ${formatCurrency(
                invoice.subtotalDkk / invoice.hoursWorked,
                'dk',
                'dkk'
              )}`;

              invoiceTotal = `${invoiceTotal} / ${formatCurrency(invoice.subtotalDkk, 'dk', 'dkk')}`;

              invoiceTotalWithVat = `${invoiceTotalWithVat} / ${formatCurrency(
                invoice.subtotalDkk * 1.25,
                'dk',
                'dkk'
              )}`;
            }
            return (
              <div key={invoice.id} className="invoices card mb-1">
                <div className="card-header py-1">
                  <span className="badge bg-danger me-1">{`${invoice.visibleId}${
                    isAdmin ? `/${invoice.id}` : ''
                  }`}</span>
                  <span className="invoice-date fs-5 text-muted">
                    <i className="uil uil-calender" /> {toDateString(invoice.invoiceDate)}
                  </span>
                  <span className="fs-5 fw-bold text-muted ms-2">
                    {invoice.customer.name}
                    {invoice.reference && <span> - {invoice.reference}</span>}
                  </span>
                  <InvoiceStatusBadge className="float-end ms-1" status={invoice?.status} />
                </div>
                <div className="card-body py-1">
                  <div className="row">
                    <div className="col">
                      <CardItem label={t('labels.hours')} value={invoice.hoursWorked} />
                    </div>
                    <div className="col">
                      <CardItem label={t('labels.perHour')} value={invoicePerHour} />
                    </div>
                    <div className="col">
                      <CardItem label={t('labels.total')} value={invoiceTotal} />
                    </div>
                    <div className="col">
                      <CardItem
                        label={t('labels.vat25')}
                        value={invoice.includeVat ? invoiceTotalWithVat : '-'}
                      />
                    </div>
                    <div className="col">
                      <CardItem label={t('labels.paidAmount')} value={invoicePaidAmountDkk} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
