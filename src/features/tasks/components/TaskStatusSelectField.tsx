import { useTranslation } from 'next-i18next';
import { TaskStatusEnum } from '~/.generated/globalTypes';
import SelectField from '~/features/forms/components/SelectField';

type TaskStatusSelectFieldProps = {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
};

function TaskStatusSelectField({
  name,
  label,
  description = undefined,
  required = false
}: TaskStatusSelectFieldProps) {
  const { t } = useTranslation('tasks');

  let options = Object.keys(TaskStatusEnum).map((key) => ({
    value: key,
    label: t(`statuses.${key}`)
  }));

  options = options.sort((a, b) => `${a.label}`.localeCompare(b.label));

  return (
    <SelectField name={name} label={label} description={description} required={required} options={options} />
  );
}

export default TaskStatusSelectField;
