import { useTranslation } from 'next-i18next';
import { DeductionStatusEnum } from '~/.generated/globalTypes';
import SelectField from '~/features/forms/components/SelectField';

type DeductionStatusSelectFieldProps = {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
};

function DeductionStatusSelectField({
  name,
  label,
  description = undefined,
  required = false
}: DeductionStatusSelectFieldProps) {
  const { t } = useTranslation('deductions');

  let options = Object.keys(DeductionStatusEnum).map((key) => ({
    value: key,
    label: t(`statuses.${key}`)
  }));
  options = options.sort((a, b) => `${a.label}`.localeCompare(b.label));

  return (
    <SelectField name={name} label={label} description={description} required={required} options={options} />
  );
}

export default DeductionStatusSelectField;
