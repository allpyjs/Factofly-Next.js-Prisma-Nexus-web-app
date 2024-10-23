import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import RequiredSymbol from './RequiredSymbol';

type RadioFieldProps = {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  options: RadioFieldOption[];
};

export type RadioFieldOption = {
  value: string;
  label: string;
};

function RadioField({ name, label, description = undefined, required = false, options }: RadioFieldProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const isValid = errors[name] === undefined;

  return (
    <>
      <div className={classNames('form-group ', { required, 'form-group-invalid': !isValid })}>
        <legend className="col-form-label pt-0">
          {label} {required && <RequiredSymbol />}
        </legend>
        {options.map((item) => (
          <div className="form-check mb-1">
            <label>
              {item.label} {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <input className="form-check-input" {...register(name)} type="radio" value={item.value} />
            </label>
          </div>
        ))}

        <div className="invalid-feedback">{errors[name]?.message}</div>
        <small className="form-text text-muted">{description}</small>
      </div>
      <style jsx>{`
        legend {
          font-weight: 600;
        }
        label {
          font-weight: 400;
          margin-b
        }
      `}</style>
    </>
  );
}

export default RadioField;
