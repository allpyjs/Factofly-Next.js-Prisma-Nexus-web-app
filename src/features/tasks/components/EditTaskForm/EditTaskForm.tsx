import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import TextField from '~/features/forms/components/TextField';
import SubmitButton from '~/features/forms/components/SubmitButton';
import SectionHeader from '~/features/forms/components/SectionHeader';
import FormError from '~/features/forms/components/FormError';
import useEditTaskForm from './useEditTaskForm';
import FadeIn from '~/features/shared/components/FadeIn';
import CustomerSelectField from '~/features/customers/components/CustomerSelectField';
import CreateCustomerButton from '~/features/customers/components/CreateCustomerButton';
import JobTypeSelectField from '~/features/forms/components/JobTypeSelectField';
import DateField from '~/features/forms/components/DateField';
import { RecordTypeEnum, TaskStatusEnum } from '~/.generated/globalTypes';
import { EditTaskFormData } from './EditTaskFormData';
import useUser from '~/contexts/User/useUser';
import EditTaskStatusForm from './EditTaskStatusForm';
import AuditCard from '~/features/audits/components/AuditCard';
import FormWrapper from '~/features/forms/components/FormWrapper';
import TextAreaField from '~/features/forms/components/TextAreaField';
import TaskPaymentTypeSelectField from '../TaskPaymentTypeSelectField';

function EditTaskForm(): JSX.Element {
  const { t } = useTranslation('tasks');
  const { isAdmin } = useUser();
  const {
    query: { id }
  } = useRouter();

  const taskId = parseInt(id! as string, 10);

  const { onSubmit, error, saving, loading, data, form, isRequired } = useEditTaskForm(taskId);

  if (loading) return <div className="loading" />;

  const canEdit = data?.status === TaskStatusEnum.DRAFT || isAdmin;

  return (
    <FadeIn>
      <>
        <h1>{form.watch('title')}</h1>
        {!canEdit && (
          <div className="alert alert-warning">
            {t('messages.readOnly', { status: t(`statuses.${data?.status}`) })}
          </div>
        )}
        {isAdmin && <EditTaskStatusForm taskId={taskId} />}
        {isAdmin && <AuditCard recordId={taskId} recordType={RecordTypeEnum.TASK} />}
        <FormWrapper form={form} onSubmit={onSubmit}>
          <div className="card">
            <div className="card-body">
              <SectionHeader title={t('headers.customer')} />
              <div className="row g-1">
                <div className={classNames({ 'col-9': canEdit, 'col-12': !canEdit })}>
                  <CustomerSelectField
                    name="customerId"
                    label={t('labels.customer')}
                    required={isRequired('customerId')}
                    readOnly={!canEdit}
                    userId={data?.userId}
                  />
                </div>
                <div className="col-3">{canEdit && <CreateCustomerButton inline />}</div>
              </div>
              <SectionHeader title={t('headers.taskInformation')} />
              <div className="row g-1">
                <div className="col">
                  <TextField
                    name="title"
                    label={t('labels.title')}
                    required={isRequired('title')}
                    readOnly={!canEdit}
                  />
                </div>
              </div>
              <div className="row g-1">
                <div className="col">
                  <TextField
                    name="reference"
                    label={t('labels.reference')}
                    required={isRequired('reference')}
                    readOnly={!canEdit}
                  />
                </div>
                <div className="col">
                  <JobTypeSelectField
                    name="jobTypeId"
                    label={t('labels.jobType')}
                    required={isRequired('jobTypeId')}
                    readOnly={!canEdit}
                  />
                </div>
              </div>
              <TextAreaField
                name="description"
                label={t('labels.description')}
                required={isRequired('description')}
                description={t('descriptions.description')}
                readOnly={!canEdit}
              />
              <div className="row g-1">
                <div className="col">
                  <TaskPaymentTypeSelectField
                    name="paymentType"
                    label={t('labels.paymentType')}
                    required={isRequired('paymentType')}
                    readOnly={!canEdit}
                  />
                </div>
                <div className="col">
                  <TextField
                    name="paymentAmount"
                    label={t('labels.paymentAmount')}
                    required={isRequired('paymentAmount')}
                    readOnly={!canEdit}
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
                    readOnly={!canEdit}
                  />
                </div>
                <div className="col">
                  <DateField
                    name="endDate"
                    label={t('labels.endDate')}
                    required={isRequired('endDate')}
                    readOnly={!canEdit}
                  />
                </div>
                <div className="col">
                  <TextField
                    type="number"
                    name="expectedHours"
                    label={t('labels.expectedHours')}
                    required={isRequired('expectedHours')}
                    readOnly={!canEdit}
                  />
                </div>
              </div>
            </div>
            <div className="card-footer">
              {error && <FormError message={error.message} />}
              {canEdit && (
                <>
                  <SubmitButton title={t('buttons.update')} saving={saving} className="mr-2" />
                  {data?.status === TaskStatusEnum.DRAFT && (
                    <SubmitButton
                      title={t('buttons.submit')}
                      saving={saving}
                      onClick={form.handleSubmit((submitData: EditTaskFormData) => {
                        onSubmit({ ...submitData, status: TaskStatusEnum.SENT });
                      })}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </FormWrapper>
      </>
    </FadeIn>
  );
}

export default EditTaskForm;
