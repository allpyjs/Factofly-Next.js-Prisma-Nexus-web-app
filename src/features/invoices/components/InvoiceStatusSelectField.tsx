import { useTranslation } from 'next-i18next';
import { InvoiceStatusEnum } from '~/.generated/globalTypes';
import SelectField from '~/features/forms/components/SelectField';

type InvoiceStatusSelectFieldProps = {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
};

function InvoiceStatusSelectField({
  name,
  label,
  description = undefined,
  required = false
}: InvoiceStatusSelectFieldProps) {
  const { t } = useTranslation('invoices');

  const options = Object.keys(InvoiceStatusEnum)
    .map((key) => ({
      value: key,
      label: t(`statuses.${key}`)
    }))
    .sort((a, b) => `${a.label}`.localeCompare(b.label));

  return (
    <SelectField name={name} label={label} description={description} required={required} options={options} />
  );
}

export default InvoiceStatusSelectField;
