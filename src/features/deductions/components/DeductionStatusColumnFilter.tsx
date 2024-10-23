import { useTranslation } from 'next-i18next';
import { DeductionStatusEnum } from '~/.generated/globalTypes';
import SelectColumnFilter from '~/features/tables/components/DataTable/SelectColumnFilter';

type DeductionStatusColumnFilterProps = {
  column: { filterValue: any; setFilter: Function };
};

function DeductionStatusColumnFilter({ column }: DeductionStatusColumnFilterProps) {
  const { t } = useTranslation('deductions');
  const options = Object.keys(DeductionStatusEnum).map((key) => ({
    value: key,
    label: t(`statuses.${key}`)
  }));

  return <SelectColumnFilter column={column} options={options} />;
}

export default DeductionStatusColumnFilter;
