import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import FormSection from '~/features/forms/components/FormSection';
import FormSectionContent from '~/features/forms/components/FormSectionContent';
import SectionHeader from '~/features/forms/components/SectionHeader';
import TextField from '~/features/forms/components/TextField';
import convertNumber from '~/utils/convertNumber';
import formatCurrency from '~/utils/formatCurrency';

export default function CreateInvoiceLinesFormSectionMobile() {
  const { t } = useTranslation('invoices');

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
        <div key={field.id}>
          <div>
            <TextField name={`lines.${index}.description`} label={t('labels.description')} required />
          </div>
          <div>
            <TextField name={`lines.${index}.quantity`} label={t('labels.quantity')} required />
          </div>
          <div>
            <TextField name={`lines.${index}.unitPrice`} label={t('labels.unitPrice')} required />
          </div>
          <div />
          <div className="font-weight-bold text-end">
            <span className="d-inline-block pe-2 align-middle mt-2">
              {formatCurrency(
                (convertNumber(watch(`lines.${index}.quantity`)) ?? 0) *
                  (convertNumber(watch(`lines.${index}.unitPrice`)) ?? 0),
                'dk',
                watch(`currency`)
              )}{' '}
            </span>
            <button
              type="button"
              className="btn btn-danger btn-sm mt-2"
              onClick={() => setValue(`lines.${index}.deleted`, true)}
            >
              <i className="uil uil-trash" />
            </button>
          </div>
          <hr />
        </div>
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
      <div>
        <div className="text-end">
          {label}
          <span className={classNames('ms-2 fw-bold', className)}>
            {formatCurrency(value, 'dk', currency)}
          </span>
        </div>
      </div>
    ),
    [currency]
  );

  return (
    <FormSection>
      <SectionHeader title={t('headers.orderLines')} showToggle />
      <FormSectionContent>
        {rows}
        <button
          type="button"
          className="btn btn-primary btn-sm mt-2"
          onClick={() => {
            append({ index: fields.length });
          }}
        >
          <i className="uil-plus me-1" />
          {t('buttons.addLine')}
        </button>

        <TotalRow label={t('labels.subtotal')} value={subtotal} />
        {watch(`includeVat`) && <TotalRow label={t('labels.vat25')} value={tax} />}
        <TotalRow label={t('labels.total')} value={total} className="text-decoration-underline" />
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
