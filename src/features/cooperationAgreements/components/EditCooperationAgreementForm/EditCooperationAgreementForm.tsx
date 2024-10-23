import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import TextField from '~/features/forms/components/TextField';
import SubmitButton from '~/features/forms/components/SubmitButton';
import FormError from '~/features/forms/components/FormError';
import useEditCooperationAgreementForm from './useEditCooperationAgreementForm';
import FadeIn from '~/features/shared/components/FadeIn';
import useUser from '~/contexts/User/useUser';
import { RecordTypeEnum } from '~/.generated/globalTypes';
import AuditCard from '~/features/audits/components/AuditCard';
import FormWrapper from '~/features/forms/components/FormWrapper';
import TextAreaField from '~/features/forms/components/TextAreaField';
import SelectField from '~/features/forms/components/SelectField';
import CheckboxField from '~/features/forms/components/CheckboxField';
import DateField from '~/features/forms/components/DateField';
import CreateCustomerButton from '~/features/customers/components/CreateCustomerButton';
import CustomerSelectField from '~/features/customers/components/CustomerSelectField';

function EditCooperationAgreementForm(): JSX.Element {
  const { t } = useTranslation('cooperationAgreements');
  const { isAdmin } = useUser();
  const {
    query: { id }
  } = useRouter();

  const cooperationAgreementId = parseInt(id! as string, 10);

  const { onSubmit, error, saving, data, loading, form, isRequired } =
    useEditCooperationAgreementForm(cooperationAgreementId);

  if (loading) return <div className="loading" />;

  const paymentTypeOptions = [
    { value: 'PER_HOUR', label: t('paymentTypes.PER_HOUR') },
    { value: 'FIXED', label: t('paymentTypes.FIXED') }
  ];

  const extraWorkNotificationOptions = [
    { value: 'WRITTEN_ESTIMATE', label: t('extraWorkNotifications.WRITTEN_ESTIMATE') },
    { value: 'WRITTEN_FIXED', label: t('extraWorkNotifications.WRITTEN_FIXED') },
    { value: 'ORAL', label: t('extraWorkNotifications.ORAL') },
    { value: 'OTHER', label: t('extraWorkNotifications.OTHER') }
  ];

  const paymentTermOptions = [
    { value: 'CURRENT_MONTH_PLUS', label: t('paymentTerms.CURRENT_MONTH_PLUS') },
    { value: 'ONGOING_WEEK_PLUS', label: t('paymentTerms.ONGOING_WEEK_PLUS') },
    { value: 'TASK_END_PLUS', label: t('paymentTerms.TASK_END_PLUS') },
    { value: 'OTHER', label: t('paymentTerms.OTHER') }
  ];

  return (
    <FadeIn>
      <>
        <h1>{t('headers.edit')}</h1>
        {isAdmin && (
          <AuditCard recordId={cooperationAgreementId} recordType={RecordTypeEnum.COOPERATION_AGREEMENT} />
        )}
        <FormWrapper form={form} onSubmit={onSubmit}>
          <div className="card">
            <div className="card-body">
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
                  <DateField
                    name="startDate"
                    label={t('labels.startDate')}
                    required={isRequired('startDate')}
                  />
                  <CheckboxField
                    name="openEnded"
                    label={t('labels.openEnded')}
                    required={isRequired('openEnded')}
                  />
                </div>
                <div className="col">
                  {!form.watch('openEnded') && (
                    <DateField name="endDate" label={t('labels.endDate')} required={isRequired('endDate')} />
                  )}
                </div>
              </div>
              <div className="row g-1">
                <div className="col">
                  <TextAreaField
                    name="terminationAgreement"
                    label={t('labels.terminationAgreement')}
                    description={t('descriptions.terminationAgreement')}
                    required={isRequired('terminationAgreement')}
                  />
                  <TextAreaField
                    name="taskDescription"
                    label={t('labels.taskDescription')}
                    required={isRequired('taskDescription')}
                  />
                </div>
              </div>
              <div className="row g-1">
                <div className="col">
                  <CheckboxField
                    name="equipmentSupplied"
                    label={t('labels.equipmentSupplied')}
                    description={t('descriptions.equipmentSupplied')}
                    required={isRequired('equipmentSupplied')}
                  />
                </div>
                <div className="col">
                  {form.watch('equipmentSupplied') && (
                    <TextAreaField
                      name="equipmentDetails"
                      label={t('labels.equipmentDetails')}
                      required={isRequired('equipmentDetails')}
                    />
                  )}
                </div>
              </div>
              <div className="row g-1">
                <div className="col">
                  <CheckboxField
                    name="extraWork"
                    label={t('labels.extraWork')}
                    required={isRequired('extraWork')}
                  />
                </div>
                <div className="col">
                  {form.watch('extraWork') && (
                    <SelectField
                      name="extraWorkNotification"
                      label={t('labels.extraWorkNotification')}
                      options={extraWorkNotificationOptions}
                      required={isRequired('extraWorkNotification')}
                    />
                  )}
                  {form.watch('extraWork') && form.watch('extraWorkNotification') === 'OTHER' && (
                    <TextField
                      name="extraWorkNotificationOther"
                      label={t('labels.extraWorkNotificationOther')}
                      required={isRequired('extraWorkNotificationOther')}
                    />
                  )}
                </div>
              </div>
              <div className="row g-1">
                <div className="col">
                  <TextAreaField
                    name="specialConditions"
                    label={t('labels.specialConditions')}
                    description={t('descriptions.specialConditions')}
                    required={isRequired('specialConditions')}
                  />
                  <SelectField
                    name="paymentType"
                    label={t('labels.paymentType')}
                    options={paymentTypeOptions}
                    required={isRequired('paymentType')}
                  />
                </div>
              </div>
              <div className="row g-1">
                <div className="col">
                  <SelectField
                    name="paymentTerm"
                    label={t('labels.paymentTerm')}
                    options={paymentTermOptions}
                    required={isRequired('paymentTerm')}
                  />
                </div>
                <div className="col">
                  <TextField
                    name="paymentTermDays"
                    type="number"
                    label={t('labels.paymentTermDays')}
                    required={isRequired('paymentTermDays')}
                  />
                </div>
              </div>
              <div className="row g-1">
                <div className="col">
                  {form.watch('paymentTerm') === 'OTHER' && (
                    <TextField
                      name="paymentTermOther"
                      label={t('labels.paymentTermOther')}
                      required={isRequired('paymentTermOther')}
                    />
                  )}
                  <TextAreaField
                    name="paymentTermSpecial"
                    label={t('labels.paymentTermSpecial')}
                    required={isRequired('paymentTermSpecial')}
                  />
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

export default EditCooperationAgreementForm;
