import { useRouter } from 'next/router';
import { Trans, useTranslation } from 'next-i18next';
import TextField from '~/features/forms/components/TextField';
import SubmitButton from '~/features/forms/components/SubmitButton';
import SectionHeader from '~/features/forms/components/SectionHeader';
import FormError from '~/features/forms/components/FormError';
import useEditInvoiceForm from './useEditInvoiceForm';
import FadeIn from '~/features/shared/components/FadeIn';
import CustomerSelectField from '~/features/customers/components/CustomerSelectField';
import CreateCustomerButton from '~/features/customers/components/CreateCustomerButton';
import JobTypeSelectField from '~/features/forms/components/JobTypeSelectField';
import DateField from '~/features/forms/components/DateField';
import CheckboxField from '~/features/forms/components/CheckboxField';
import TermsLink from '~/features/shared/components/TermsLink';
import FormSection from '~/features/forms/components/FormSection';
import TaskSelectField from '~/features/forms/components/TaskSelectField';
import { InvoiceStatusEnum } from '~/.generated/globalTypes';
import { EditInvoiceFormData } from './EditInvoiceFormData';
import CurrencySelectField from '~/features/forms/components/CurrencySelectField';
import EditInvoiceStatusForm from './EditInvoiceStatusForm';
import useUser from '~/contexts/User/useUser';
import FormSectionContent from '~/features/forms/components/FormSectionContent';
import AuditCard from '~/features/audits/components/AuditCard';
import FormWrapper from '~/features/forms/components/FormWrapper';
import FormValidationErrors from '~/features/forms/components/FormValidationErrors';
import RewardField from '../RewardField';
import Discount from '../Discount';
import EarlyPaymentField from '../EarlyPaymentField';
import EditInvoiceLinesFormSection from './EditInvoiceLinesFormSection';
import useFeatures from '~/features/shared/hooks/useFeatures';

function EditInvoiceForm(): JSX.Element {
  const { t } = useTranslation('invoices');
  const { isEnabled } = useFeatures();
  const { isAdmin } = useUser();
  const {
    query: { id }
  } = useRouter();

  const invoiceId = parseInt(id! as string, 10);
  const { onSubmit, error, saving, loading, data, form, isRequired } = useEditInvoiceForm(invoiceId);
  if (loading) return <div className="loading" />;

  return (
    <FadeIn>
      {isAdmin && <EditInvoiceStatusForm invoiceId={invoiceId} />}
      {isAdmin && <AuditCard recordId={invoiceId} recordType="INVOICE" />}
      <FormWrapper form={form} onSubmit={onSubmit}>
        <div className="card">
          <div className="card-body">
            <FormSection>
              <SectionHeader title={t('headers.customer')} showToggle />
              <FormSectionContent>
                <div className="row g-1">
                  <div className="col-9">
                    <CustomerSelectField
                      name="customerId"
                      label={t('labels.customer')}
                      required={isRequired('customerId')}
                      userId={data?.userId}
                    />
                  </div>
                  <div className="col-3">
                    <CreateCustomerButton inline />
                  </div>
                </div>
                <div className="row g-1">
                  <div className="col">
                    <TextField
                      name="customerContact"
                      label={t('labels.customerContact')}
                      required={isRequired('customerContact')}
                    />
                  </div>
                  <div className="col">
                    <TextField
                      name="customerEmail"
                      label={t('labels.customerEmail')}
                      required={isRequired('customerEmail')}
                    />
                  </div>
                </div>
                <div className="row g-1">
                  <div className="col" />
                  <div className="col">
                    <TextField
                      name="sendInvoiceCopyTo"
                      label={t('labels.sendInvoiceCopyTo')}
                      required={isRequired('sendInvoiceCopyTo')}
                    />
                  </div>
                </div>
              </FormSectionContent>
            </FormSection>
            <FormSection>
              <SectionHeader title={t('headers.task')} showToggle />
              <FormSectionContent>
                <div className="row g-1">
                  <div className="col-6">
                    <TaskSelectField
                      name="taskId"
                      label={t('labels.task')}
                      required={isRequired('taskId')}
                      userId={data?.userId}
                      customerId={form.watch('customerId')}
                    />
                  </div>
                </div>
              </FormSectionContent>
            </FormSection>
            <FormSection>
              <SectionHeader title={t('headers.invoiceInformation')} showToggle />
              <FormSectionContent>
                <div className="row g-1">
                  <div className="col">
                    <DateField
                      name="invoiceDate"
                      label={t('labels.invoiceDate')}
                      required={isRequired('invoiceDate')}
                    />
                  </div>
                  <div className="col">
                    <TextField
                      name="reference"
                      label={t('labels.reference')}
                      required={isRequired('reference')}
                    />
                  </div>
                </div>
                <div className="row g-1">
                  <div className="col">
                    <DateField
                      name="startDate"
                      label={t('labels.startDate')}
                      required={isRequired('startDate')}
                    />
                  </div>
                  <div className="col">
                    <DateField name="endDate" label={t('labels.endDate')} required={isRequired('endDate')} />
                  </div>
                </div>
                <div className="row g-1">
                  <div className="col">
                    <JobTypeSelectField
                      name="jobTypeId"
                      label={t('labels.jobType')}
                      required={isRequired('jobTypeId')}
                    />
                  </div>
                  <div className="col">
                    <TextField
                      name="hoursWorked"
                      label={t('labels.hoursWorked')}
                      required={isRequired('hoursWorked')}
                    />
                  </div>
                </div>
              </FormSectionContent>
            </FormSection>
            <FormSection>
              <SectionHeader title={t('headers.paymentDetails')} showToggle />
              <FormSectionContent>
                <div className="row g-1">
                  <div className="col">
                    <TextField
                      name="paymentDueDays"
                      label={t('labels.paymentDueDays')}
                      required={isRequired('paymentDueDays')}
                    />
                  </div>
                  <div className="col">
                    <CurrencySelectField
                      name="currency"
                      label={t('labels.currency')}
                      required={isRequired('currency')}
                    />
                  </div>
                </div>
                <div className="row g-1">
                  <div className="col">
                    <CheckboxField
                      name="includeVat"
                      label={t('labels.includeVat')}
                      description={t('descriptions.includeVat')}
                      required={isRequired('includeVat')}
                    />
                  </div>
                </div>
              </FormSectionContent>
            </FormSection>
            {isAdmin && (
              <FormSection>
                <SectionHeader title="Admin" showToggle />
                <FormSectionContent>
                  <div className="row g-1">
                    <div className="col">
                      <TextField
                        name="paidAmountDkk"
                        label={t('labels.paidAmount')}
                        required={isRequired('paidAmountDkk')}
                      />
                    </div>
                    <div className="col" />
                  </div>
                </FormSectionContent>
              </FormSection>
            )}
            <EditInvoiceLinesFormSection />
            {!data?.creditsUsed && <RewardField />}
            {!!data?.creditsUsed && <Discount invoice={data} />}
            {form.watch('allowEarlyPayment') && isEnabled('feature-early-payment') && <EarlyPaymentField />}
            <Trans
              t={t}
              i18nKey="terms"
              components={{
                termsLink: <TermsLink />
              }}
            />
            <CheckboxField
              name="termsAccepted"
              label={t('labels.termsAccepted')}
              required={isRequired('termsAccepted')}
            />
          </div>
          <div className="card-footer">
            {error && <FormError message={error.message} />}
            <FormValidationErrors />
            <SubmitButton title={t('buttons.update')} saving={saving} className="mr-2" />
            {data?.status === InvoiceStatusEnum.DRAFT && (
              <SubmitButton
                title={t('buttons.submit')}
                saving={saving}
                onClick={form.handleSubmit((submittedData: EditInvoiceFormData) => {
                  onSubmit({ ...submittedData, status: InvoiceStatusEnum.SENT });
                })}
              />
            )}
          </div>
        </div>
      </FormWrapper>
      <style jsx>{`
        .card :global(.alert) {
          padding: 10px 10px 0 10px;
          margin: 1rem -10px 1rem -10px;
        }
        .card :global(.alert-secondary) {
          background: #efefef;
          color: #6c757d;
        }
      `}</style>
    </FadeIn>
  );
}

export default EditInvoiceForm;
