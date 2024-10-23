import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import InfoTooltip from '~/features/shared/components/InfoTooltip';
import RequiredSymbol from './RequiredSymbol';

type TextFieldProps = {
  name: string;
  type?: 'text' | 'email' | 'number' | 'tel' | 'password' | 'search';
  label: string;
  description?: string;
  required?: boolean;
  readOnly?: boolean;
  tooltip?: string;
};

export function TextField({
  name,
  type = 'text',
  label,
  description = undefined,
  tooltip = undefined,
  required = false,
  readOnly = false
}: TextFieldProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const isValid = errors[name] === undefined;

  return (
    <div className={classNames('form-group mb-2 ', { required, 'form-group-invalid': !isValid })}>
      <label className="form-label" htmlFor={name}>
        {label} {required && <RequiredSymbol />} {tooltip && <InfoTooltip text={tooltip} />}
      </label>
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(name)}
        className={classNames('form-control', { required, 'is-invalid ': !isValid })}
        aria-invalid={!isValid}
        type={type}
        name={name}
        readOnly={readOnly}
      />
      {errors[name]?.message && <div className="invalid-feedback">{errors[name]?.message}</div>}
      {description && <div className="form-text text-muted">{description}</div>}
    </div>
  );
}

export default TextField;
