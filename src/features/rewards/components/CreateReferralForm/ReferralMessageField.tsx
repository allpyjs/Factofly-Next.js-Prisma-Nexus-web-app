import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';
import useUser from '~/contexts/User/useUser';
import RequiredSymbol from '~/features/forms/components/RequiredSymbol';

type ReferralMessageFieldProps = {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  readOnly?: boolean;
};

export function ReferralMessageField({
  name,
  label,
  description = undefined,
  required = false,
  readOnly = false
}: ReferralMessageFieldProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  const { t } = useTranslation('common');
  const { t: tRewards } = useTranslation('rewards');
  const { displayName } = useUser();

  const isValid = errors[name] === undefined;

  return (
    <div className={classNames('form-group mb-2 ', { required, 'form-group-invalid': !isValid })}>
      <label className="form-label" htmlFor={name}>
        {label} {required && <RequiredSymbol />}
      </label>
      <div className="bg-light text-muted p-2 fw-bold">
        {tRewards('messages.referralEmailTitle', { displayName })}
      </div>
      <div className="border rounded bg-light">
        <textarea
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register(name)}
          className={classNames('form-control border-0 rounded-0', { required, 'is-invalid ': !isValid })}
          aria-invalid={!isValid}
          name={name}
          readOnly={readOnly}
        />
        <div className="text-center mt-2">
          <button type="button" className="btn btn-primary" disabled>
            {t('buttons.register')}
          </button>
        </div>
        <div className="px-2 pb-3 text-muted">
          <br />
          {t('messages.emailSignature')}
          <br />
          {displayName}
        </div>
      </div>
      {errors[name]?.message && <div className="invalid-feedback">{errors[name]?.message}</div>}
      {description && <div className="form-text text-muted">{description}</div>}
    </div>
  );
}

export default ReferralMessageField;
