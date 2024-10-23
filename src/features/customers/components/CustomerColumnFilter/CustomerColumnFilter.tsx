import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';
import CustomerColumnFilterQuery from './graphql/CustomerColumnFilterQuery.gql';
import {
  CustomerColumnFilterQuery as CustomerColumnFilterQueryType,
  CustomerColumnFilterQuery_customers_nodes as CustomerType
} from './graphql/.generated/CustomerColumnFilterQuery';
import useUser from '~/contexts/User/useUser';
import AsyncSelectColumnFilter, {
  AsyncSelectColumnFilterOption
} from '~/features/tables/components/DataTable/AsyncSelectColumnFilter';

type CustomerColumnFilterProps = {
  column: { filterValue: any; setFilter: Function };
};

function CustomerColumnFilter({ column }: CustomerColumnFilterProps) {
  const { id: userId, isUser } = useUser();
  const [getCustomers] = useLazyQuery<CustomerColumnFilterQueryType>(CustomerColumnFilterQuery);

  const parseData = (data: CustomerColumnFilterQueryType): AsyncSelectColumnFilterOption[] =>
    data?.customers.nodes.map((customer: CustomerType) => ({
      value: customer.id,
      label: customer.name
    })) ?? [];

  const loadOptions = useCallback(
    (name: string): Promise<AsyncSelectColumnFilterOption[]> =>
      new Promise((resolve, reject) => {
        getCustomers({
          variables: {
            where: {
              active: { equals: true },
              user: isUser ? { id: { equals: userId } } : undefined,
              name: { contains: name }
            }
          },
          onCompleted: (data) => {
            resolve(parseData(data));
          },
          onError: (err) => reject(err)
        });
      }),
    [getCustomers, isUser, userId]
  );

  return <AsyncSelectColumnFilter column={column} loadOptions={loadOptions} />;
}

export default CustomerColumnFilter;
