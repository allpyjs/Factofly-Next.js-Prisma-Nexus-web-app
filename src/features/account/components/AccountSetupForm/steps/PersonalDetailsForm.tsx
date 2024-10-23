import { useTranslation } from 'next-i18next';
import FormSection from '~/features/forms/components/FormSection';
import JobTypeSelectField from '~/features/forms/components/JobTypeSelectField';
import SelectField from '~/features/forms/components/SelectField';
import TextField from '~/features/forms/components/TextField';

type PersonalDetailsFormProps = {
  isRequired: (name: string) => boolean;
};

export default function PersonalDetailsForm({ isRequired }: PersonalDetailsFormProps) {
  const { t } = useTranslation('users');

  const languageOptions = [
    { value: 'DA', label: 'Dansk' },
    { value: 'EN', label: 'English' }
  ];

  return (
    <FormSection>
      <div className="row g-1">
        <div className="col">
          <TextField name="firstName" label={t('labels.firstName')} required={isRequired('firstName')} />
        </div>
        <div className="col">
          <TextField name="lastName" label={t('labels.lastName')} required={isRequired('lastName')} />
        </div>
      </div>
      <div className="row g-1">
        <div className="col">
          <TextField
            name="phoneNumber"
            label={t('labels.phoneNumber')}
            required={isRequired('phoneNumber')}
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
      <div className="row g-1">
        <div className="col">
          <SelectField
            name="language"
            label={t('labels.language')}
            options={languageOptions}
            required={isRequired('language')}
          />
        </div>
        <div className="col" />
      </div>
    </FormSection>
  );
}
