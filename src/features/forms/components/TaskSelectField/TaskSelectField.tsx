import { useQuery } from '@apollo/client';
import TaskSelectFieldQuery from './graphql/TaskSelectFieldQuery.gql';
import {
  TaskSelectFieldQuery as TaskSelectFieldQueryType,
  TaskSelectFieldQuery_tasks_nodes as TaskNode
} from './graphql/.generated/TaskSelectFieldQuery';
import SelectField, { SelectFieldOption } from '../SelectField';
import FieldLoading from '../FieldLoading';
import useUser from '~/contexts/User/useUser';

type TaskSelectFieldProps = {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  userId?: bigint | number;
  customerId?: bigint | number;
};

function TaskSelectField({
  name,
  label,
  description = undefined,
  required = false,
  userId = undefined,
  customerId = undefined
}: TaskSelectFieldProps) {
  const { id: currentUserId } = useUser();

  const {
    loading,
    error: loadError,
    data
  } = useQuery<TaskSelectFieldQueryType>(TaskSelectFieldQuery, {
    fetchPolicy: 'no-cache', // TODO: Figure how to refresh this cache properly
    variables: {
      where: {
        active: { equals: true },
        user: { id: { equals: userId ? Number(userId) : Number(currentUserId) } },
        customer: customerId ? { id: { equals: Number(customerId) } } : undefined
      }
    }
  });

  const options: SelectFieldOption[] =
    data?.tasks.nodes.map((task: TaskNode) => ({
      value: task.id,
      label: task.title
    })) ?? [];

  if (loading) return <FieldLoading />;
  if (loadError) throw Error('There was an error loading this component');

  return (
    <SelectField name={name} label={label} description={description} required={required} options={options} />
  );
}

export default TaskSelectField;
