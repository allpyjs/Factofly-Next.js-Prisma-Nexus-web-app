import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';
import SectionHeader from '~/features/forms/components/SectionHeader';
import DetailsCardSection from '~/features/shared/components/DetailsCardSection';
import formatCurrency from '~/utils/formatCurrency';
import { InvoiceDetailsQuery_invoice_lines as LinesType } from './graphql/.generated/InvoiceDetailsQuery';

type InvoiceLinesFormSectionProps = {
  lines: LinesType[];
  includeVat: boolean;
  currency: string;
};

export default function InvoiceLinesFormSection({
  currency,
  includeVat,
  lines
}: InvoiceLinesFormSectionProps) {
  const { t } = useTranslation('invoices');

  const rows = lines.map((line) => (
    <tr>
      <td>{line.description}</td>
      <td>{line.quantity}</td>
      <td>{line.unitPrice}</td>
      <td className="font-weight-bold text-end">
        {formatCurrency(line.quantity * line.unitPrice, 'dk', currency)}
      </td>
    </tr>
  ));

  const totals = lines.map((line) => line.quantity * line.unitPrice);
  const subtotal = totals.reduce((total, current) => total + current, 0);
  const tax = includeVat ? subtotal * 0.25 : 0;
  const total = subtotal + tax;

  const TotalRow = useCallback(
    ({ label, value, className }: any) => (
      <tr>
        <td colSpan={2} />
        <td className="text-end">{label}</td>
        <td className={classNames('text-end fw-bold', className)}>{formatCurrency(value, 'dk', currency)}</td>
      </tr>
    ),
    [currency]
  );

  return (
    <DetailsCardSection>
      <SectionHeader title={t('headers.orderLines')} />
      <table className="table table-centered table-compact mb-0">
        <thead className="table-dark">
          <tr>
            <th style={{ width: '50%' }}>{t('labels.description')}</th>
            <th style={{ width: '20%' }}>{t('labels.quantity')}</th>
            <th style={{ width: '20%' }}>{t('labels.price')}</th>
            <th style={{ width: '5%' }} className="text-end">
              {t('labels.lineTotal')}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows}
          <TotalRow label={t('labels.subtotal')} value={subtotal} />
          {includeVat && <TotalRow label={t('labels.vat25')} value={tax} />}
          <TotalRow label={t('labels.total')} value={total} className="text-decoration-underline" />
        </tbody>
      </table>
      <style jsx>{`
        .table.table-compact th,
        .table.table-compact :global(td) {
          padding: 0.3rem;
          border-bottom-width: 0;
        }
        .table :global(.btn) :global(i) {
          margin: 0;
        }
      `}</style>
    </DetailsCardSection>
  );
}
