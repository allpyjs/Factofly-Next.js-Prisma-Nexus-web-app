import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import RequiredSymbol from './RequiredSymbol';

type TextAreaFieldProps = {
  name: string;
  label: string;
  description?: string;
  className?: string;
  required?: boolean;
  readOnly?: boolean;
};

export function TextAreaField({
  name,
  label,
  className = undefined,
  description = undefined,
  required = false,
  readOnly = false
}: TextAreaFieldProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const isValid = errors[name] === undefined;

  return (
    <div className={classNames('form-group mb-2 ', { required, 'form-group-invalid': !isValid })}>
      <label className="form-label" htmlFor={name}>
        {label} {required && <RequiredSymbol />}
      </label>
      <textarea
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(name)}
        className={classNames('form-control', className, { required, 'is-invalid ': !isValid })}
        aria-invalid={!isValid}
        name={name}
        readOnly={readOnly}
      />
      {errors[name]?.message && <div className="invalid-feedback">{errors[name]?.message}</div>}
      {description && <div className="form-text text-muted">{description}</div>}
    </div>
  );
}

export default TextAreaField;
