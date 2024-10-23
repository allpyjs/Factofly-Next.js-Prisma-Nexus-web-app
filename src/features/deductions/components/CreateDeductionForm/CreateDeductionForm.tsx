import { useTranslation } from 'next-i18next';
import TextField from '~/features/forms/components/TextField';
import SubmitButton from '~/features/forms/components/SubmitButton';
import FormError from '~/features/forms/components/FormError';
import useCreateDeductionForm, { CreateDeductionFormData } from './useCreateDeductionForm';
import FileUploadField from '../../../forms/components/FileUploadField';
import FormWrapper from '~/features/forms/components/FormWrapper';
import useUser from '~/contexts/User/useUser';
import CurrencySelectField from '~/features/forms/components/CurrencySelectField';
import CheckboxField from '~/features/forms/components/CheckboxField';

function CreateDeductionForm(): JSX.Element {
  const { t } = useTranslation('deductions');
  const { id: userId, displayName, isImpersonating } = useUser();

  const defaultValues: CreateDeductionFormData = {
    createAsUserId: isImpersonating ? userId : undefined
  };
  const { onSubmit, error, saving, form, isRequired } = useCreateDeductionForm({ defaultValues });

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      {isImpersonating && (
        <div className="alert alert-warning">{t('messages.createAs', { displayName })}</div>
      )}
      <div className="card">
        <div className="card-body">
          <div className="row g-1">
            <div className="col">
              <TextField
                name="description"
                label={t('labels.description')}
                required={isRequired('description')}
              />
              <div className="row">
                <div className="col">
                  <CurrencySelectField
                    name="currency"
                    label={t('labels.currency')}
                    required={isRequired('currency')}
                  />
                </div>
                <div className="col">
                  <TextField
                    name="total"
                    label={t('labels.total')}
                    description={t('descriptions.total')}
                    required={isRequired('total')}
                  />
                  <CheckboxField
                    name="includeVat"
                    label={t('labels.includeVat')}
                    required={isRequired('includeVat')}
                  />
                </div>
              </div>
              <FileUploadField name="imageFile" />
            </div>
          </div>
        </div>
        <div className="card-footer">
          {error && <FormError message={error.message} />}
          <SubmitButton title={t('buttons.submit')} saving={saving} className="mr-2" />
        </div>
      </div>
    </FormWrapper>
  );
}

export default CreateDeductionForm;
