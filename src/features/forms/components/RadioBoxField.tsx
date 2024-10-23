import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import RequiredSymbol from './RequiredSymbol';

type RadioBoxFieldProps = {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  colClassName?: string;
  options: RadioBoxFieldOption[];
};

export type RadioBoxFieldOption = {
  value: string;
  label: string;
};

function RadioBoxField({
  name,
  label,
  description = undefined,
  required = false,
  options,
  colClassName = 'col'
}: RadioBoxFieldProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext();

  const isValid = errors[name] === undefined;

  return (
    <>
      <div className={classNames('form-group ', { required, 'form-group-invalid': !isValid })}>
        <legend className="col-form-label pt-0">
          {label} {required && <RequiredSymbol />}
        </legend>
        <div className="row gx-1 gy-0">
          {options.map((item) => (
            <div className={colClassName} key={item.value}>
              <div
                className={classNames('form-check mb-1', { checked: watch(name) === item.value })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setValue(name, item.value)}
                onClick={() => setValue(name, item.value)}
              >
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <input className="form-check-input" {...register(name)} type="radio" value={item.value} />
                {item.label}
              </div>
            </div>
          ))}
        </div>
        <div className="invalid-feedback">{errors[name]?.message}</div>
        <small className="form-text text-muted">{description}</small>
      </div>
      <style jsx>{`
        legend {
          font-weight: 600;
        }
        label {
          font-weight: 400;
        }
        .form-check {
          border: 1px solid #dee2e6;
          border-radius: 3px;
          padding: 7px;
          cursor: pointer;
        }
        .form-check .form-check-input {
          float: none;
          margin: 3px 10px;
        }
        .form-check.checked {
          border: 1px solid #4f994f;
          background-color: #f2ffeb;
        }
        .form-check-input {
          margin-left: 20px;
        }
        .col-form-label {
          padding-bottom: 3px;
        }
      `}</style>
    </>
  );
}

export default RadioBoxField;
