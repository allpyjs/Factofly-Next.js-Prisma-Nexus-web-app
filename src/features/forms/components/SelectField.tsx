import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect from 'react-select';
import InfoTooltip from '~/features/shared/components/InfoTooltip';
import RequiredSymbol from './RequiredSymbol';

type SelectFieldProps = {
  name: string;
  label: string;
  description?: string;
  tooltip?: string;
  required?: boolean;
  options: SelectFieldOption[];
  readOnly?: boolean;
};

export type SelectFieldOption = {
  value: string | number | bigint | null;
  label: string;
};

function SelectField({
  name,
  label,
  description = undefined,
  tooltip = undefined,
  options,
  required = false,
  readOnly = false
}: SelectFieldProps) {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  const { t } = useTranslation('common');

  const isValid = errors[name] === undefined;

  return (
    <div className={classNames('form-group ', { required, 'form-group-invalid': !isValid })}>
      <label className="form-label" htmlFor={name}>
        {label} {required && <RequiredSymbol />}
        {tooltip && <InfoTooltip text={tooltip} />}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactSelect
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...field}
            className={classNames('select-field__select', { required, 'is-invalid ': !isValid })}
            classNamePrefix="react-select"
            aria-invalid={!isValid}
            name={name}
            options={options}
            value={options.find((c) => c.value?.toString() === field.value?.toString())} // we do toString so that number and bigint are comparable.
            onChange={(val) => field.onChange(val?.value)}
            isDisabled={readOnly}
            placeholder={t('messages.select')}
          />
        )}
      />
      <div className="invalid-feedback">{errors[name]?.message}</div>
      <small className="form-text text-muted">{description}</small>
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

export default SelectField;
