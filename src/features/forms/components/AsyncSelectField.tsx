import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect from 'react-select/async';
import RequiredSymbol from './RequiredSymbol';

type AsyncSelectFieldProps = {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  loadOptions: (input: string) => Promise<AsyncSelectFieldOption[]>;
  readOnly?: boolean;
};

export type AsyncSelectFieldOption = {
  value: string | number | bigint | null;
  label: string;
};

function AsyncSelectField({
  name,
  label,
  description = undefined,
  loadOptions,
  required = false,
  readOnly = false
}: AsyncSelectFieldProps) {
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
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
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

export default AsyncSelectField;
