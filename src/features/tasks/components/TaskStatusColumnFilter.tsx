import { useTranslation } from 'next-i18next';
import { TaskStatusEnum } from '~/.generated/globalTypes';
import SelectColumnFilter from '~/features/tables/components/DataTable/SelectColumnFilter';

type TaskStatusColumnFilterProps = {
  column: { filterValue: any; setFilter: Function };
};

function TaskStatusColumnFilter({ column }: TaskStatusColumnFilterProps) {
  const { t } = useTranslation('tasks');

  const options = Object.keys(TaskStatusEnum).map((key) => ({
    value: key,
    label: t(`statuses.${key}`)
  }));

  return <SelectColumnFilter column={column} options={options} />;
}

export default TaskStatusColumnFilter;
