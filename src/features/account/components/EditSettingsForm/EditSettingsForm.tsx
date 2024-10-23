import { useTranslation } from 'next-i18next';
import SubmitButton from '~/features/forms/components/SubmitButton';
import FormError from '~/features/forms/components/FormError';
import useEditSettingsForm from './useEditSettingsForm';
import FadeIn from '~/features/shared/components/FadeIn';
import CountrySelectField from '~/features/forms/components/CountrySelectField';
import useUser from '~/contexts/User/useUser';
import SelectField from '~/features/forms/components/SelectField';
import JobTypeSelectField from '~/features/forms/components/JobTypeSelectField';
import FormSection from '~/features/forms/components/FormSection';
import SectionHeader from '~/features/forms/components/SectionHeader';
import TextField from '~/features/forms/components/TextField';
import BankAccountSection from './BankAccountSection';
import TaxInfoSection from './TaxInfoSection';
import FormWrapper from '~/features/forms/components/FormWrapper';

function EditSettingsForm(): JSX.Element {
  const { t } = useTranslation('users');
  const { id: userId, displayName } = useUser();

  const { onSubmit, error, saving, loading, form, isRequired } = useEditSettingsForm(userId);

  const languageOptions = [
    { value: 'DA', label: 'Dansk' },
    { value: 'EN', label: 'English' }
  ];

  if (loading) return <div className="loading" />;

  return (
    <FadeIn>
      <>
        <h1>{displayName}</h1>
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
                    <TextField
                      name="email"
                      label={t('labels.email')}
                      required={isRequired('email')}
                      readOnly
                    />
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
              <BankAccountSection />
              <TaxInfoSection />
            </div>
            <div className="card-footer">
              {error && <FormError message={error.message} />}
              <SubmitButton title={t('buttons.saveSettings')} saving={saving} />
            </div>
          </div>
        </FormWrapper>
      </>
    </FadeIn>
  );
}

export default EditSettingsForm;
