import { useTranslation } from 'next-i18next';
import { TaskPaymentTypeEnum } from '~/.generated/globalTypes';
import SelectField from '~/features/forms/components/SelectField';

type TaskPaymentTypeSelectFieldProps = {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  readOnly?: boolean;
};

function TaskPaymentTypeSelectField({
  name,
  label,
  description = undefined,
  required = false,
  readOnly = false
}: TaskPaymentTypeSelectFieldProps) {
  const { t } = useTranslation('tasks');

  let options = Object.keys(TaskPaymentTypeEnum).map((key) => ({
    value: key,
    label: t(`taskPaymentTypes.${key}`)
  }));

  options = options.sort((a, b) => `${a.label}`.localeCompare(b.label));

  return (
    <SelectField
      name={name}
      label={label}
      description={description}
      required={required}
      options={options}
      readOnly={readOnly}
    />
  );
}

export default TaskPaymentTypeSelectField;
