import classNames from 'classnames';
import ReactSelect, { ActionMeta, SingleValue } from 'react-select';

type SelectProps = {
  name: string;
  options: SelectOption[];
  readOnly?: boolean;
  onChange?: SelectOnChange;
  className?: string;
  value?: SelectOption;
};

export type SelectOnChange = (
  newValue: SingleValue<SelectOption>,
  actionMeta: ActionMeta<SelectOption>
) => void;

export type SelectOption = {
  value: string | number | bigint | null;
  label: string;
};

function Select({
  name,
  options,
  readOnly = false,
  onChange = undefined,
  className = undefined,
  value = undefined
}: SelectProps) {
  return (
    <div className={classNames('form-group', className)}>
      <ReactSelect
        className={classNames('select-field__select')}
        classNamePrefix="react-select"
        name={name}
        options={options}
        isDisabled={readOnly}
        onChange={onChange}
        value={value}
      />
      <style jsx>{`
        .form-group :global(.select-field__select) {
          flex-grow: 1;
        }

        .form-group :global(.select-field__select .react-select__control) {
          border: 1px solid #dee2e6;
        }

        .form-group :global(.select-field__select .react-select__control--is-focused) {
          box-shadow: 0 0 10px rgb(55 125 255 / 10%);
        }

        .form-group :global(.select-field__select .react-select__control--is-disabled) {
          background-color: #eef2f7;
        }
      `}</style>
    </div>
  );
}

export default Select;
