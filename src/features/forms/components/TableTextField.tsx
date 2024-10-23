import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

type TableTextFieldProps = {
  parent: string;
  name: string;
  index: number;
  type?: 'number' | 'text';
};

export default function TableTextField({ parent, name, index, type = 'text' }: TableTextFieldProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const parentError = errors[parent];
  const rowError = parentError ? parentError[index] : undefined;
  const isValid = !parentError || parentError.length === 0 || !rowError || rowError[name] === undefined;
  return (
    <input
      className={classNames('form-control', { 'is-invalid ': !isValid })}
      type={type}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...register(`${parent}.${index}.${name}`)}
    />
  );
}
