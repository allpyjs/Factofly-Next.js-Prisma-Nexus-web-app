import { useTranslation } from 'next-i18next';
import FormError from '~/features/forms/components/FormError';
import FormSection from '~/features/forms/components/FormSection';
import FormWrapper from '~/features/forms/components/FormWrapper';
import SectionHeader from '~/features/forms/components/SectionHeader';
import SubmitButton from '~/features/forms/components/SubmitButton';
import InvoiceStatusSelectField from '../InvoiceStatusSelectField';
import useEditInvoiceStatusForm from './useEditInvoiceStatusForm';

type EditInvoiceStatusFormProps = {
  invoiceId: number;
};

export default function EditInvoiceStatusForm({ invoiceId }: EditInvoiceStatusFormProps) {
  const { t } = useTranslation('invoices');
  const { onSubmit, error, saving, loading, form, isRequired } = useEditInvoiceStatusForm(invoiceId);

  if (loading) return <div className="loading" />;

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <div className="card">
        <div className="card-body">
          <FormSection>
            <SectionHeader title={t('headers.status')} />
            <div className="row g-1">
              <div className="col">
                <InvoiceStatusSelectField
                  name="status"
                  label={t('labels.status')}
                  required={isRequired('status')}
                />
              </div>
            </div>
          </FormSection>
        </div>
        <div className="card-footer">
          {error && <FormError message={error.message} />}
          <SubmitButton title={t('buttons.update')} saving={saving} className="mr-2" />
        </div>
      </div>
    </FormWrapper>
  );
}
