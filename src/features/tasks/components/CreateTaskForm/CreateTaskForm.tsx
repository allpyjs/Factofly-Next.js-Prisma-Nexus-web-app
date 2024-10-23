import { Trans, useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import TextField from '~/features/forms/components/TextField';
import SubmitButton from '~/features/forms/components/SubmitButton';
import SectionHeader from '~/features/forms/components/SectionHeader';
import FormError from '~/features/forms/components/FormError';
import useCreateTaskForm from './useCreateTaskForm';
import { CreateTaskFormData } from './CreateTaskFormData';
import CustomerSelectField from '~/features/customers/components/CustomerSelectField';
import DateField from '~/features/forms/components/DateField/DateField';
import CreateCustomerButton from '~/features/customers/components/CreateCustomerButton';
import JobTypeSelectField from '~/features/forms/components/JobTypeSelectField';
import { TaskStatusEnum } from '~/.generated/globalTypes';
import FormWrapper from '~/features/forms/components/FormWrapper';
import useUser from '~/contexts/User/useUser';
import TextAreaField from '~/features/forms/components/TextAreaField';
import TermsLink from '~/features/shared/components/TermsLink';
import CheckboxField from '~/features/forms/components/CheckboxField';
import TaskPaymentTypeSelectField from '../TaskPaymentTypeSelectField';

function CreateTaskForm(): JSX.Element {
  const { t } = useTranslation('tasks');
  const router = useRouter();
  const { customer_id: customerId } = router.query;
  const { id: userId, displayName, isImpersonating } = useUser();

  const { onSubmit, error, saving, form, isRequired } = useCreateTaskForm({
    defaultValues: {
      customerId: customerId ? BigInt(customerId as string) : undefined,
      termsAccepted: false,
      status: TaskStatusEnum.DRAFT,
      createAsUserId: isImpersonating ? userId : undefined
    }
  });

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      {({ handleSubmit }: any): JSX.Element => (
        <>
          {' '}
          {isImpersonating && (
            <div className="alert alert-warning">{t('messages.createAs', { displayName })}</div>
          )}
          <div className="card">
            <div className="card-body">
              <SectionHeader title={t('headers.customer')} />
              <div className="row g-1">
                <div className="col-9">
                  <CustomerSelectField
                    name="customerId"
                    label={t('labels.customer')}
                    required={isRequired('customerId')}
                  />
                </div>
                <div className="col-3">
                  <CreateCustomerButton inline />
                </div>
              </div>
              <SectionHeader title={t('headers.taskInformation')} />
              <div className="row g-1">
                <div className="col">
                  <TextField name="title" label={t('labels.title')} required={isRequired('title')} />
                </div>
              </div>
              <div className="row g-1">
                <div className="col">
                  <TextField
                    name="reference"
                    label={t('labels.reference')}
                    required={isRequired('reference')}
                  />
                </div>
                <div className="col">
                  <JobTypeSelectField
                    name="jobTypeId"
                    label={t('labels.jobType')}
                    required={isRequired('jobTypeId')}
                  />
                </div>
              </div>
              <TextAreaField
                name="description"
                label={t('labels.description')}
                required={isRequired('description')}
                description={t('descriptions.description')}
              />
              <div className="row g-1">
                <div className="col">
                  <TaskPaymentTypeSelectField
                    name="paymentType"
                    label={t('labels.paymentType')}
                    required={isRequired('paymentType')}
                  />
                </div>
                <div className="col">
                  <TextField
                    name="paymentAmount"
                    label={t('labels.paymentAmount')}
                    required={isRequired('paymentAmount')}
                  />
                </div>
              </div>
              <SectionHeader title={t('headers.execution')} />
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
                <div className="col">
                  <TextField
                    type="number"
                    name="expectedHours"
                    label={t('labels.expectedHours')}
                    required={isRequired('expectedHours')}
                  />
                </div>
              </div>
              <div className="mt-4">
                <Trans
                  t={t}
                  i18nKey="terms"
                  components={{
                    link: <TermsLink />
                  }}
                />
                <CheckboxField
                  name="termsAccepted"
                  label={t('labels.termsAccepted')}
                  required={isRequired('termsAccepted')}
                />
              </div>
            </div>
            <div className="card-footer">
              {error && <FormError message={error.message} />}
              <SubmitButton title={t('buttons.saveAsDraft')} saving={saving} className="mr-2" />
              <SubmitButton
                title={t('buttons.submit')}
                saving={saving}
                onClick={handleSubmit((data: CreateTaskFormData) => {
                  onSubmit({ ...data, status: TaskStatusEnum.SENT });
                })}
              />
            </div>
          </div>
        </>
      )}
    </FormWrapper>
  );
}

export default CreateTaskForm;
