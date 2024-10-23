import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import RequiredSymbol from './RequiredSymbol';

type CheckboxFieldProps = {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
};

export function CheckboxField({
  name,
  label,
  description = undefined,
  required = false
}: CheckboxFieldProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const isValid = errors[name] === undefined;

  return (
    <div
      className={classNames('form-group my-2 ', {
        required,
        'form-group-invalid': !isValid
      })}
    >
      <div className={classNames('form-check', { required, 'is-invalid ': !isValid })}>
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register(name)}
          className={classNames('form-check-input', { required, 'is-invalid ': !isValid })}
          type="checkbox"
          aria-invalid={!isValid}
          name={name}
        />
        <label className="form-label" htmlFor={name}>
          {label} {required && <RequiredSymbol />}
        </label>
      </div>
      {errors[name]?.message && <div className="invalid-feedback">{errors[name]?.message}</div>}
      {description && <div className="form-text text-muted">{description}</div>}
    </div>
  );
}

export default CheckboxField;
