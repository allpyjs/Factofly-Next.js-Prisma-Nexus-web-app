import classNames from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import RequiredSymbol from '../RequiredSymbol';
import InfoTooltip from '~/features/shared/components/InfoTooltip';

type DateFieldProps = {
  name: string;
  type?: 'text' | 'email';
  label: string;
  description?: string;
  tooltip?: string;
  required?: boolean;
  maxDate?: Date;
  minDate?: Date;
  readOnly?: boolean;
};

export function DateField({
  name,
  label,
  description = undefined,
  tooltip = undefined,
  required = false,
  maxDate = undefined,
  minDate = undefined,
  readOnly = false
}: DateFieldProps) {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const isValid = errors[name] === undefined;

  // if (readOnly) return <TextField name={name} label={label} required={required} readOnly={readOnly} />;

  return (
    <div className={classNames('form-group mb-2 ', { required, 'form-group-invalid': !isValid })}>
      <label className="form-label" htmlFor={name}>
        {label} {required && <RequiredSymbol />}
        {tooltip && <InfoTooltip text={tooltip} />}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...field}
            className={classNames('date-field', { required, 'is-invalid ': !isValid })}
            aria-invalid={!isValid}
            name={name}
            calendarIcon={<i className="uil-calendar-alt" />}
            clearIcon={<i className="uil-times" />}
            minDate={minDate}
            maxDate={maxDate}
            dayPlaceholder="dd"
            monthPlaceholder="mm"
            yearPlaceholder="yyyy"
            format="dd.MM.yyyy"
            disabled={readOnly}
            value={typeof field.value === 'string' ? new Date(field.value) : field.value}
          />
        )}
      />
      <style jsx global>{`
        .date-field {
          display: block;
          width: 100%;
        }
        .date-field i {
          font-size: 17px;
        }
        .date-field .react-date-picker__inputGroup__leadingZero {
          margin: -1px -1px 0 1px;
          color: black;
        }
        .date-field .react-date-picker__wrapper {
          width: 100%;
          padding: 0.1rem 0.9rem;
          font-size: 0.9rem;
          font-weight: 400;
          line-height: 1.5;
          color: #6c757d;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #dee2e6;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          border-radius: 0.25rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .react-date-picker--disabled .react-date-picker__wrapper {
          background-color: #eef2f7;
        }
      `}</style>
      {errors[name]?.message && <div className="invalid-feedback">{errors[name]?.message}</div>}
      {description && <div className="form-text text-muted">{description}</div>}
    </div>
  );
}

export default DateField;
