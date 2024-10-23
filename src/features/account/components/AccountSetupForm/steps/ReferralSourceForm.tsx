import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';
import FormSection from '~/features/forms/components/FormSection';
import RadioBoxField, { RadioBoxFieldOption } from '~/features/forms/components/RadioBoxField';
import TextField from '~/features/forms/components/TextField';

type PaymentDetailsFormProps = {
  isRequired: (name: string) => boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ReferralSourceForm({ isRequired }: PaymentDetailsFormProps) {
  const { watch } = useFormContext();
  const { t } = useTranslation('users');
  const referralSourceOptions: RadioBoxFieldOption[] = [
    { label: t('referralSources.GOOGLE'), value: 'Google' },
    { label: t('referralSources.FACEBOOK'), value: 'Facebook' },
    { label: t('referralSources.INSTAGRAM'), value: 'Instagram' },
    { label: t('referralSources.LINKEDIN'), value: 'LinkedIn' },
    { label: t('referralSources.NETWORK'), value: 'Network' },
    { label: t('referralSources.A_KASSE'), value: 'A-Kasse' },
    { label: t('referralSources.OTHER'), value: 'Other' }
  ];
  return (
    <FormSection>
      <RadioBoxField
        name="userSpecifiedReferral"
        label={t('labels.userSpecifiedReferral')}
        colClassName="col-4"
        options={referralSourceOptions}
        required={isRequired('userSpecifiedReferral')}
      />
      {watch('userSpecifiedReferral') === 'Other' && (
        <TextField
          name="userSpecifiedReferralOther"
          label={t('labels.userSpecifiedReferralOther')}
          required={isRequired('userSpecifiedReferralOther')}
        />
      )}
    </FormSection>
  );
}
