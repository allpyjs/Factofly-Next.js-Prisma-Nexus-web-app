import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { RecordType } from '@prisma/client';
import SubmitButton from '~/features/forms/components/SubmitButton';
import FormError from '~/features/forms/components/FormError';
import useEditUserForm from './useEditUserForm';
import FadeIn from '~/features/shared/components/FadeIn';
import CountrySelectField from '~/features/forms/components/CountrySelectField';
import SelectField from '~/features/forms/components/SelectField';
import JobTypeSelectField from '~/features/forms/components/JobTypeSelectField';
import FormSection from '~/features/forms/components/FormSection';
import SectionHeader from '~/features/forms/components/SectionHeader';
import TextField from '~/features/forms/components/TextField';
import FormWrapper from '~/features/forms/components/FormWrapper';
import useUser from '~/contexts/User/useUser';
import AuditCard from '~/features/audits/components/AuditCard';
import BankAccountSection from './BankAccountSection';
import TaxInfoSection from './TaxInfoSection';
import FormValidationErrors from '~/features/forms/components/FormValidationErrors';
import ServiceLogCard from '~/features/services/components/ServiceLogCard';

function EditUserForm(): JSX.Element {
  const { t } = useTranslation('users');
  const { isAdmin } = useUser();
  const {
    query: { id }
  } = useRouter();

  const userId = BigInt(id! as string);

  const { onSubmit, error, saving, loading, form, isRequired } = useEditUserForm(userId);

  if (loading) return <div className="loading" />;

  const languageOptions = [
    { value: 'DA', label: 'Danish' },
    { value: 'EN', label: 'English' }
  ];

  const salaryPaymentTypeOptions = [
    { value: 'EARLY', label: t('salaryPaymentType.EARLY') },
    { value: 'ON_PAYMENT', label: t('salaryPaymentType.ON_PAYMENT') },
    { value: 'VALUE', label: t('salaryPaymentType.VALUE') },
    { value: 'TIMED', label: t('salaryPaymentType.TIMED') },
    { value: 'VIA_INVOICE', label: t('salaryPaymentType.VIA_INVOICE') },
    { value: null, label: t('salaryPaymentType.NONE') }
  ].sort((a, b) => `${a.label}`.localeCompare(b.label));

  return (
    <FadeIn>
      <>
        <h1>
          {form.watch('firstName')
            ? `${form.watch('firstName')} ${form.watch('lastName')}`
            : form.watch('email')}
        </h1>
        {isAdmin && <AuditCard recordId={userId} recordType={RecordType.USER} />}
        {isAdmin && <ServiceLogCard recordId={userId} recordType={RecordType.USER} />}
        <FormWrapper form={form} onSubmit={onSubmit}>
          <div className="card">
            <div className="card-body">
              <FormSection>
                <SectionHeader title={t('headers.settings')} />
                <div className="row g-1">
                  <div className="col">
                    <JobTypeSelectField
                      name="jobTypeId"
                      label={t('labels.jobType')}
                      required={isRequired('jobTypeId')}
                    />
                  </div>
                  <div className="col">
                    <SelectField
                      name="language"
                      label={t('labels.language')}
                      options={languageOptions}
                      required={isRequired('language')}
                    />
                  </div>
                </div>
                <div className="row g-1">
                  <div className="col" />
                </div>
              </FormSection>
              <FormSection>
                <SectionHeader title={t('headers.contact')} />

                <div className="row g-1">
                  <div className="col">
                    <TextField
                      name="firstName"
                      label={t('labels.firstName')}
                      required={isRequired('firstName')}
                    />
                  </div>
                  <div className="col">
                    <TextField
                      name="lastName"
                      label={t('labels.lastName')}
                      required={isRequired('lastName')}
                    />
                  </div>
                </div>
                <div className="row g-1">
                  <div className="col">
                    <TextField name="email" label={t('labels.email')} required={isRequired('email')} />
                  </div>
                  <div className="col">
                    <TextField
                      name="phoneNumber"
                      label={t('labels.phoneNumber')}
                      required={isRequired('phoneNumber')}
                    />
                  </div>
                </div>
              </FormSection>
              <FormSection>
                <SectionHeader title={t('headers.address')} />
                <TextField
                  name="address.address"
                  label={t('labels.address')}
                  required={isRequired('address.address')}
                />
                <div className="row g-1">
                  <div className="col">
                    <TextField
                      name="address.city"
                      label={t('labels.city')}
                      required={isRequired('address.city')}
                    />
                  </div>
                  <div className="col">
                    <TextField
                      name="address.postalCode"
                      label={t('labels.postalCode')}
                      required={isRequired('address.postalCode')}
                    />
                  </div>
                </div>
                <div className="row g-1">
                  <div className="col">
                    <CountrySelectField
                      name="address.countryId"
                      label={t('labels.country')}
                      required={isRequired('address.countryId')}
                    />
                  </div>
                  <div className="col" />
                </div>
              </FormSection>
              <FormSection>
                <SectionHeader title={t('headers.salaryInformation')} />
                <div className="row g-1">
                  <div className="col">
                    <SelectField
                      name="salaryPaymentType"
                      label={t('labels.salaryPaymentType')}
                      required={isRequired('address.salaryPaymentType')}
                      options={salaryPaymentTypeOptions}
                    />
                  </div>
                  <div className="col">
                    {form.watch('salaryPaymentType') === 'VALUE' && (
                      <TextField
                        name="salaryPaymentValue"
                        label={t('labels.salaryPaymentValue')}
                        required={isRequired('address.salaryPaymentValue')}
                      />
                    )}
                    {form.watch('salaryPaymentType') === 'TIMED' && (
                      <TextField
                        name="salaryPaymentDay"
                        label={t('labels.salaryPaymentDay')}
                        required={isRequired('address.salaryPaymentDay')}
                      />
                    )}
                  </div>
                </div>
                <div className="row g-1">
                  <div className="col">
                    <TextField
                      name="baseRate"
                      label={t('labels.baseRate')}
                      required={isRequired('address.baseRate')}
                    />
                  </div>
                  <div className="col" />
                </div>
              </FormSection>
              <BankAccountSection />
              <TaxInfoSection />
            </div>
            <div className="card-footer">
              {error && <FormError message={error.message} />}
              <FormValidationErrors />
              <SubmitButton title={t('buttons.saveUser')} saving={saving} />
            </div>
          </div>
        </FormWrapper>
      </>
    </FadeIn>
  );
}

export default EditUserForm;
