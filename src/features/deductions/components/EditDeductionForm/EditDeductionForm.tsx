import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import TextField from '~/features/forms/components/TextField';
import SubmitButton from '~/features/forms/components/SubmitButton';
import FormError from '~/features/forms/components/FormError';
import useEditDeductionForm from './useEditDeductionForm';
import FadeIn from '~/features/shared/components/FadeIn';
import FileUploadField from '../../../forms/components/FileUploadField';
import ImageViewer from '~/features/shared/components/ImageViewer';
import useUser from '~/contexts/User/useUser';
import { RecordTypeEnum } from '~/.generated/globalTypes';
import AuditCard from '~/features/audits/components/AuditCard';
import EditDeductionStatusForm from './EditDeductionStatusForm';
import FormWrapper from '~/features/forms/components/FormWrapper';
import CurrencySelectField from '~/features/forms/components/CurrencySelectField';
import CheckboxField from '~/features/forms/components/CheckboxField';

type EditDeductionFormProps = {
  id?: number;
  showStatusForm?: boolean;
  showUpload?: boolean;
  showTitle?: boolean;
  onCompleted?: () => void;
};

function EditDeductionForm({
  id = undefined,
  showStatusForm = true,
  showUpload = true,
  showTitle = true,
  onCompleted = undefined
}: EditDeductionFormProps): JSX.Element {
  const { t } = useTranslation('deductions');
  const { isAdmin } = useUser();
  const {
    query: { id: routeId }
  } = useRouter();

  const deductionId = id ?? parseInt(routeId! as string, 10);

  const { onSubmit, error, saving, loading, form, isRequired } = useEditDeductionForm(deductionId, {
    onCompleted
  });

  if (loading) return <div className="loading" />;

  const imageUrl = form.watch('imageUrl');

  return (
    <FadeIn>
      <>
        {showTitle && <h1>{form.watch('description')}</h1>}
        {isAdmin && showStatusForm && <EditDeductionStatusForm deductionId={deductionId} />}
        {isAdmin && <AuditCard recordId={deductionId} recordType={RecordTypeEnum.DEDUCTION} />}
        <FormWrapper form={form} onSubmit={onSubmit}>
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

                  <div className="card">
                    <div className="card-body">
                      {imageUrl && <ImageViewer src={imageUrl} alt="deductions image" />}
                    </div>
                  </div>
                  {showUpload && <FileUploadField name="imageFile" />}
                </div>
              </div>
            </div>
            <div className="card-footer">
              {error && <FormError message={error.message} />}
              <SubmitButton title={t('buttons.update')} saving={saving} />
            </div>
          </div>
        </FormWrapper>
      </>
    </FadeIn>
  );
}

export default EditDeductionForm;
