import { useTranslation } from 'next-i18next';
import { InvoiceStatusEnum } from '~/.generated/globalTypes';
import Select, { SelectOnChange } from '~/features/forms/components/Select';

type InvoiceStatusSelectProps = {
  name?: string;
  className?: string;
  onChange?: SelectOnChange;
  value?: InvoiceStatusEnum;
};

function InvoiceStatusSelectField({
  name = 'invoiceStatus',
  className = undefined,
  onChange = undefined,
  value = undefined
}: InvoiceStatusSelectProps) {
  const { t } = useTranslation('invoices');
  let options = Object.keys(InvoiceStatusEnum).map((key) => ({
    value: key,
    label: t(`statuses.${key}`)
  }));

  options = options.sort((a, b) => `${a.label}`.localeCompare(b.label));

  const selected = options.find((x) => x.value === value) ?? undefined;

  return <Select name={name} options={options} className={className} value={selected} onChange={onChange} />;
}

export default InvoiceStatusSelectField;
