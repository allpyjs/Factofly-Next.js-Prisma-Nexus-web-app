import { useQuery } from '@apollo/client';
import CustomerSelectFieldQuery from './graphql/CustomerSelectFieldQuery.gql';
import {
  CustomerSelectFieldQuery as CustomerSelectFieldQueryType,
  CustomerSelectFieldQuery_customers_nodes as CustomerType
} from './graphql/.generated/CustomerSelectFieldQuery';
import useUser from '~/contexts/User/useUser';
import SelectField, { SelectFieldOption } from '~/features/forms/components/SelectField';
import FieldLoading from '~/features/forms/components/FieldLoading';

type CustomerSelectFieldProps = {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  readOnly?: boolean;
  userId?: number | bigint;
};

function CustomerSelectField({
  name,
  label,
  description = undefined,
  required = false,
  readOnly = false,
  userId = undefined
}: CustomerSelectFieldProps) {
  const { id: currentUserId } = useUser();

  const {
    loading,
    error: loadError,
    data
  } = useQuery<CustomerSelectFieldQueryType>(CustomerSelectFieldQuery, {
    fetchPolicy: 'no-cache', // TODO: Figure how to refresh this cache properly
    variables: {
      where: {
        active: { equals: true },
        user: { id: { equals: userId ? Number(userId) : Number(currentUserId) } }
      }
    }
  });

  const options: SelectFieldOption[] =
    data?.customers.nodes.map((customer: CustomerType) => ({
      value: Number(customer.id),
      label: customer.name
    })) ?? [];

  if (loading) return <FieldLoading />;
  if (loadError) throw Error('There was an error loading this component');

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

export default CustomerSelectField;
