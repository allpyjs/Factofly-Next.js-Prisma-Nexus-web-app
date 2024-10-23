import { Trans, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import TextField from '~/features/forms/components/TextField';
import SubmitButton from '~/features/forms/components/SubmitButton';
import SectionHeader from '~/features/forms/components/SectionHeader';
import FormError from '~/features/forms/components/FormError';
import useCreateInvoiceForm from './useCreateInvoiceForm';
import { CreateInvoiceFormData } from './CreateInvoiceFormData';
import CustomerSelectField from '~/features/customers/components/CustomerSelectField';
import DateField from '~/features/forms/components/DateField/DateField';
import CreateCustomerButton from '~/features/customers/components/CreateCustomerButton';
import JobTypeSelectField from '~/features/forms/components/JobTypeSelectField';
import FormSection from '~/features/forms/components/FormSection';
import CheckboxField from '~/features/forms/components/CheckboxField';
import CreateInvoiceLinesFormSection from './CreateInvoiceLinesFormSection';
import TermsLink from '~/features/shared/components/TermsLink';
import { InvoiceStatusEnum } from '~/.generated/globalTypes';
import TaskSelectField from '~/features/forms/components/TaskSelectField';
import CurrencySelectField from '~/features/forms/components/CurrencySelectField';
import CopyInvoiceQuery from './graphql/CopyInvoiceQuery.gql';
import { toFormData } from './mapping/toFormData';
import FormWrapper from '~/features/forms/components/FormWrapper';
import useUser from '~/contexts/User/useUser';
import RewardField from '../RewardField';
import EarlyPaymentField from '../EarlyPaymentField';
import FormValidationErrors from '~/features/forms/components/FormValidationErrors';
import InfoTooltip from '~/features/shared/components/InfoTooltip';
import useFeatures from '~/features/shared/hooks/useFeatures';

function CreateInvoiceForm(): JSX.Element {
  const { t } = useTranslation('invoices');
  const { isEnabled } = useFeatures();
  const router = useRouter();
  const { id: userId, displayName, isImpersonating } = useUser();
  const { copy_invoice_id: copyInvoiceId, customer_id: customerId, task_id: taskId } = router.query;

  const createAsUserId = isImpersonating ? userId : undefined;

  const { onSubmit, error, saving, form, isRequired } = useCreateInvoiceForm({
    defaultValues: {
      termsAccepted: false,
      includeVat: true,
      invoiceDate: new Date(),
      status: InvoiceStatusEnum.DRAFT,
      customerId: customerId ? Number(customerId as string) : undefined,
      taskId: taskId ? Number(taskId as string) : undefined,
      currency: 'DKK',
      lines: [{ index: 0 }],
      createAsUserId
    }
  });

  const [getOriginalInvoice, { error: copyError }] = useLazyQuery(CopyInvoiceQuery);

  useEffect(() => {
    if (copyInvoiceId) {
      getOriginalInvoice({
        variables: { where: { id: copyInvoiceId } },
        onCompleted: (data) => {
          form.reset({
            ...toFormData(data.invoice),
            status: InvoiceStatusEnum.DRAFT,
            createAsUserId
          });
        }
      });
    }
  }, [copyInvoiceId, form, getOriginalInvoice, createAsUserId]);

  return (
    <FormWrapper onSubmit={onSubmit} form={form}>
      {isImpersonating && (
        <div className="alert alert-warning">{t('messages.createAs', { displayName })}</div>
      )}
      {copyError && <div className="alert alert-danger">{t('errors.copy')}</div>}
      <div className="card">
        <div className="card-body">
          <FormSection>
            <SectionHeader title={t('headers.customer')} />
            <div className="row g-1">
              <div className="col-sm-9">
                <CustomerSelectField
                  name="customerId"
                  label={t('labels.customer')}
                  required={isRequired('customerId')}
                />
              </div>
              <div className="col-sm-3">
                <CreateCustomerButton inline />
              </div>
            </div>
            <div className="row g-1">
              <div className="col-sm">
                <TextField
                  name="customerContact"
                  label={t('labels.customerContact')}
                  required={isRequired('customerContact')}
                />
              </div>
              <div className="col-sm">
                <TextField
                  name="customerEmail"
                  label={t('labels.customerEmail')}
                  required={isRequired('customerEmail')}
                />
              </div>
            </div>
            <div className="row g-1">
              <div className="col-sm" />
              <div className="col-sm">
                <TextField
                  name="sendInvoiceCopyTo"
                  label={t('labels.sendInvoiceCopyTo')}
                  required={isRequired('sendInvoiceCopyTo')}
                />
              </div>
            </div>
          </FormSection>
          <FormSection>
            <SectionHeader title={t('headers.task')} />
            <div className="row g-1">
              <div className="col-sm-6">
                <TaskSelectField
                  name="taskId"
                  label={t('labels.task')}
                  required={isRequired('taskId')}
                  customerId={form.watch('customerId')}
                />
              </div>
            </div>
          </FormSection>
          <FormSection>
            <SectionHeader title={t('headers.invoiceInformation')} />
            <div className="row g-1">
              <div className="col-sm">
                <DateField
                  name="invoiceDate"
                  label={t('labels.invoiceDate')}
                  required={isRequired('invoiceDate')}
                />
              </div>
              <div className="col-sm">
                <TextField
                  name="reference"
                  label={t('labels.reference')}
                  required={isRequired('reference')}
                />
              </div>
            </div>
            <div className="row g-1">
              <div className="col-sm">
                <DateField
                  name="startDate"
                  label={t('labels.startDate')}
                  required={isRequired('startDate')}
                  tooltip={t('info.startDate')}
                />
              </div>
              <div className="col-sm">
                <DateField
                  name="endDate"
                  label={t('labels.endDate')}
                  required={isRequired('endDate')}
                  tooltip={t('info.endDate')}
                />
              </div>
            </div>
            <div className="row g-1">
              <div className="col-sm">
                <JobTypeSelectField
                  name="jobTypeId"
                  label={t('labels.jobType')}
                  required={isRequired('jobTypeId')}
                  tooltip={t('info.jobType')}
                />
              </div>
              <div className="col-sm">
                <TextField
                  name="hoursWorked"
                  label={t('labels.hoursWorked')}
                  required={isRequired('hoursWorked')}
                  tooltip={t('info.hoursWorked')}
                />
              </div>
            </div>
          </FormSection>
          <FormSection>
            <SectionHeader title={t('headers.paymentDetails')} />
            <div className="row g-1">
              <div className="col-sm">
                <TextField
                  name="paymentDueDays"
                  label={t('labels.paymentDueDays')}
                  required={isRequired('paymentDueDays')}
                  tooltip={t('info.paymentDueDays')}
                />
              </div>
              <div className="col-sm">
                <CurrencySelectField
                  name="currency"
                  label={t('labels.currency')}
                  required={isRequired('currency')}
                />
              </div>
            </div>
            <div className="row g-1">
              <div className="col-sm">
                <CheckboxField
                  name="includeVat"
                  label={t('labels.includeVat')}
                  description={t('descriptions.includeVat')}
                  required={isRequired('includeVat')}
                />
              </div>
            </div>
          </FormSection>
          <CreateInvoiceLinesFormSection />
          <RewardField />
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
          <FormValidationErrors />
          {error && <FormError message={error.message} />}
          <SubmitButton title={t('buttons.saveAsDraft')} saving={saving} className="mr-2" />
          <SubmitButton
            title={t('buttons.submit')}
            saving={saving}
            onClick={form.handleSubmit((data: CreateInvoiceFormData) => {
              onSubmit({ ...data, status: InvoiceStatusEnum.SENT });
            })}
          />
          <InfoTooltip text={t('info.submit')} className="ms-2 mt-1" />
        </div>
      </div>
      <style jsx>{`
        .card :global(.alert) {
          padding: 10px 10px 0 10px;
          margin: 1rem -10px 1rem -10px;
        }
        .card :global(.alert-secondary) {
          background: none;
          color: #6c757d;
        }
      `}</style>
    </FormWrapper>
  );
}

export default CreateInvoiceForm;
