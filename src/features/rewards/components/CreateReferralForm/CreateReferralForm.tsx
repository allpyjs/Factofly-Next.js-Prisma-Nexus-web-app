import { useTranslation } from 'next-i18next';
import TextField from '~/features/forms/components/TextField';
import SubmitButton from '~/features/forms/components/SubmitButton';
import FormError from '~/features/forms/components/FormError';
import useCreateReferralForm from './useCreateReferralForm';
import FormWrapper from '~/features/forms/components/FormWrapper';
import useUser from '~/contexts/User/useUser';
import { ReferralMessageField } from './ReferralMessageField';

function CreateReferralForm(): JSX.Element {
  const { t } = useTranslation('rewards');
  const { displayName, isImpersonating } = useUser();

  const { onSubmit, error, saving, form, isRequired } = useCreateReferralForm({
    defaultValues: {
      message: t('messages.defaultReferralMessage')
    }
  });

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      {isImpersonating && (
        <div className="alert alert-warning">{t('messages.createAs', { displayName })}</div>
      )}
      <div className="">
        <div className="row g-1">
          <div className="col">
            <TextField name="email" label={t('labels.email')} required={isRequired('email')} />
          </div>
        </div>
        <div className="row g-1 my-2">
          <div className="col">
            <ReferralMessageField
              name="message"
              label={t('labels.message')}
              required={isRequired('message')}
            />
          </div>
        </div>
        {error && <FormError message={error.message} />}
        <div>
          <SubmitButton title={t('buttons.submit')} saving={saving} className="mr-2" />
        </div>
      </div>
      <style jsx>{`
        :global(textarea[name='message']) {
          min-height: 200px;
        }
      `}</style>
    </FormWrapper>
  );
}

export default CreateReferralForm;
