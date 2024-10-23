import { useTranslation } from 'next-i18next';
import FormSection from '~/features/forms/components/FormSection';
import RadioBoxField, { RadioBoxFieldOption } from '~/features/forms/components/RadioBoxField';

type SituationFormProps = {
  isRequired: (name: string) => boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SituationForm({ isRequired }: SituationFormProps) {
  const { t } = useTranslation('users');
  const situationOptions: RadioBoxFieldOption[] = [
    { label: t('freelancerSituations.CURIOUS'), value: 'Curious' },
    { label: t('freelancerSituations.SINGLE_TASK'), value: 'Single Task' },
    { label: t('freelancerSituations.SIDE_JOB'), value: 'Side Job' },
    { label: t('freelancerSituations.MAIN_JOB'), value: 'Main Job' }
  ];
  return (
    <FormSection>
      <RadioBoxField
        name="freelancerSituation"
        label={t('labels.freelancerSituation')}
        colClassName="col-12"
        options={situationOptions}
        required={isRequired('freelancerSituation')}
      />
    </FormSection>
  );
}
