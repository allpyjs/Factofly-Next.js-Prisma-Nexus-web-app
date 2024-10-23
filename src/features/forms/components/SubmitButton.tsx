import classNames from 'classnames';
import { MouseEventHandler } from 'react';

type SubmitButtonProps = {
  title: string;
  icon?: JSX.Element;
  saving: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

function SubmitButton({
  icon,
  title,
  saving,
  className = undefined,
  onClick = undefined,
  disabled = false
}: SubmitButtonProps) {
  return (
    <button
      type={onClick ? 'button' : 'submit'}
      className={classNames('btn btn-primary', className)}
      onClick={onClick}
      disabled={saving || disabled}
    >
      {icon} {saving ? 'Saving...' : title}
    </button>
  );
}

export default SubmitButton;
