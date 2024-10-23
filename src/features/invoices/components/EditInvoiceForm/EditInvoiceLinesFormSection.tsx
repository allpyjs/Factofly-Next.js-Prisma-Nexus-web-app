import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import FormSection from '~/features/forms/components/FormSection';
import FormSectionContent from '~/features/forms/components/FormSectionContent';
import SectionHeader from '~/features/forms/components/SectionHeader';
import TableTextField from '~/features/forms/components/TableTextField';
import convertNumber from '~/utils/convertNumber';
import formatCurrency from '~/utils/formatCurrency';
import useWindowDimensions from '~/features/shared/hooks/useWindowDimensions';
import EditInvoiceLinesFormSectionMobile from './EditInvoiceLinesFormSectionMobile';

const MOBILE_BREAKPOINT = 1200;

export default function EditInvoiceLinesFormSection() {
  const { t } = useTranslation('invoices');
  const { width } = useWindowDimensions();

  const {
    control,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext();
  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'lines' // unique name for your Field Array
  });

  const rows = fields
    .map((field, index) => {
      const isDeleted = watch(`lines.${index}.deleted`);
      if (isDeleted) return null;
      return (
        <tr key={field.id}>
          <td>
            <TableTextField parent="lines" name="description" index={index} />
          </td>
          <td>
            <TableTextField parent="lines" name="quantity" index={index} />
          </td>
          <td>
            <TableTextField parent="lines" name="unitPrice" index={index} />
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => setValue(`lines.${index}.deleted`, true)}
            >
              <i className="uil uil-trash" />
            </button>
          </td>
          <td className="font-weight-bold text-end">
            {formatCurrency(
              (convertNumber(watch(`lines.${index}.quantity`)) ?? 0) *
                (convertNumber(watch(`lines.${index}.unitPrice`)) ?? 0),
              'dk',
              watch(`currency`)
            )}
          </td>
        </tr>
      );
    })
    .filter((x) => !!x);

  const totals = fields.map((_, index) =>
    watch(`lines.${index}.deleted`)
      ? 0
      : (convertNumber(watch(`lines.${index}.quantity`)) ?? 0) *
        (convertNumber(watch(`lines.${index}.unitPrice`)) ?? 0)
  );
  const subtotal = totals.reduce((total, current) => total + current, 0);
  const tax = watch(`includeVat`) ? subtotal * 0.25 : 0;
  const total = subtotal + tax;

  const currency = watch(`currency`);
  const TotalRow = useCallback(
    ({ label, value, className }: any) => (
      <tr>
        <td colSpan={2} />
        <td colSpan={2} className="text-end">
          {label}
        </td>
        <td className={classNames('text-end fw-bold', className)}>{formatCurrency(value, 'dk', currency)}</td>
      </tr>
    ),
    [currency]
  );

  if (width < MOBILE_BREAKPOINT) return <EditInvoiceLinesFormSectionMobile />;

  return (
    <FormSection>
      <SectionHeader title={t('headers.orderLines')} showToggle />
      <FormSectionContent>
        <table className="table table-centered table-compact mb-0">
          <thead className="table-dark">
            <tr>
              <th style={{ width: '50%' }}>{t('labels.description')}</th>
              <th style={{ width: '20%' }}>{t('labels.quantity')}</th>
              <th style={{ width: '20%' }}>{t('labels.price')}</th>
              <th style={{ width: '5%' }}> </th>
              <th style={{ width: '5%' }} className="text-end">
                {t('labels.lineTotal')}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows}
            <tr>
              <td colSpan={10}>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    append({ index: fields.length });
                  }}
                >
                  <i className="uil-plus me-1" />
                  {t('buttons.addLine')}
                </button>
              </td>
            </tr>
            <TotalRow label={t('labels.subtotal')} value={subtotal} />
            {watch(`includeVat`) && <TotalRow label={t('labels.vat25')} value={tax} />}
            <TotalRow label={t('labels.total')} value={total} className="text-decoration-underline" />
          </tbody>
        </table>
        {errors.lines?.message && <div className="invalid-feedback">{errors.lines?.message}</div>}
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
      </FormSectionContent>
    </FormSection>
  );
}
