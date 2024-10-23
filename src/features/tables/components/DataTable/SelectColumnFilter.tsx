import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';
import ReactSelect from 'react-select';

type SelectColumnFilterProps = {
  column: { filterValue: any; setFilter: Function };
  options: SelectColumnFilterOption[];
};

export type SelectColumnFilterOption = {
  value: string | number | null;
  label: string;
};

function SelectColumnFilter({ column: { filterValue, setFilter }, options }: SelectColumnFilterProps) {
  const optionsWithNone = useMemo(() => [...options, { value: '', label: 'None' }], [options]);
  const { t } = useTranslation('common');
  return (
    <div className="select-column-filter">
      <ReactSelect
        className={classNames('select-column-filter__select')}
        classNamePrefix="react-select"
        options={optionsWithNone}
        isClearable
        value={options.find((c) => c.value === filterValue)}
        onChange={(val) => setFilter(val?.value)}
        placeholder={t('messages.select')}
      />
      <style jsx>{`
        .form-group :global(.select-column-filter__select) {
          flex-grow: 1;
        }

        .form-group :global(.select-column-filter__select .react-select__control) {
          border: 1px solid #dee2e6;
        }

        .form-group :global(.select-column-filter__select .react-select__control--is-focused) {
          box-shadow: 0 0 10px rgb(55 125 255 / 10%);
        }
      `}</style>
    </div>
  );
}

export default SelectColumnFilter;
