import { useTranslation } from 'next-i18next';
import { InvoiceStatusEnum } from '~/.generated/globalTypes';
import SelectColumnFilter from '~/features/tables/components/DataTable/SelectColumnFilter';

type InvoiceStatusColumnFilterProps = {
  column: { filterValue: any; setFilter: Function };
};

function InvoiceStatusColumnFilter({ column }: InvoiceStatusColumnFilterProps) {
  const { t } = useTranslation('invoices');
  let options = Object.keys(InvoiceStatusEnum).map((key) => ({
    value: key,
    label: t(`statuses.${key}`)
  }));

  options = options.sort((a, b) => `${a.label}`.localeCompare(b.label));

  return <SelectColumnFilter column={column} options={options} />;
}

export default InvoiceStatusColumnFilter;
