import { useQuery } from '@apollo/client';
import UserSelectFieldQuery from './graphql/UserSelectFieldQuery.gql';
import {
  UserSelectFieldQuery as UserSelectFieldQueryType,
  UserSelectFieldQuery_users_nodes as UserType
} from './graphql/.generated/UserSelectFieldQuery';
import useUser from '~/contexts/User/useUser';
import SelectField, { SelectFieldOption } from '~/features/forms/components/SelectField';
import FieldLoading from '~/features/forms/components/FieldLoading';

type UserSelectFieldProps = {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
};

function UserSelectField({ name, label, description = undefined, required = false }: UserSelectFieldProps) {
  const { id: userId } = useUser();
  const {
    loading,
    error: loadError,
    data
  } = useQuery<UserSelectFieldQueryType>(UserSelectFieldQuery, {
    variables: {
      where: { active: { equals: true }, user: { id: { equals: userId } } }
    }
  });

  const options: SelectFieldOption[] =
    data?.users.nodes.map((user: UserType) => ({
      value: BigInt(user.id),
      label: user.displayName
    })) ?? [];

  if (loading) return <FieldLoading />;
  if (loadError) throw Error('There was an error loading this component');

  return (
    <SelectField name={name} label={label} description={description} required={required} options={options} />
  );
}

export default UserSelectField;
