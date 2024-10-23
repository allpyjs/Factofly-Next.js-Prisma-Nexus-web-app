/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Column, Row } from 'react-table';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import CustomersTableQuery from './graphql/CustomersTableQuery.gql';
import {
  CustomersTableQuery as CustomersTableQueryType,
  CustomersTableQuery_items_edges_node as CustomerNode
} from './graphql/.generated/CustomersTableQuery';
import DefaultNameCell from '~/features/tables/components/DefaultNameCell';
import DataTable from '~/features/tables/components/DataTable';
import CustomerTypeBadge from '../CustomerTypeBadge';
import SearchFilter from '~/features/tables/components/SearchFilter';
import {
  CustomerOrderByInputArgs,
  SortOrder,
  AddressOrderByInputArgs
} from '../../../../.generated/globalTypes';
import TableRowActions from '~/features/tables/components/TableRowActions';
import TableRowMenu from '~/features/tables/components/TableRowMenu';
import TableRowMenuItem from '~/features/tables/components/TableRowMenuItem';
import DeleteButton from '~/features/shared/components/DeleteButton';
import useDeleteCustomer from '../../hooks/useDeleteCustomers/useDeleteCustomer';
import EditButton from '~/features/shared/components/EditButton';

type CustomersTableProps = {
  userId?: number;
  showUser?: boolean;
  showId?: boolean;
  allowDelete?: boolean;
};

export default function CustomersTable({
  userId = undefined,
  showUser = false,
  showId = false,
  allowDelete = false
}: CustomersTableProps) {
  const { t } = useTranslation('customers');
  const { deleteCustomer } = useDeleteCustomer();
  const { push } = useRouter();

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sortBy, setSortBy] = useState<any>([]);
  const [filters, setFilters] = useState();
  const [query, setQuery] = useState('');

  const getOrderBy = useCallback((sort: any) => {
    const orderBy: CustomerOrderByInputArgs = {};
    if (sort.length >= 1) {
      const key = sort[0].id;
      if (key === 'user') {
        orderBy.user = {
          firstName: sort[0].desc ? SortOrder.desc : SortOrder.asc
        };
      } else if (key === 'address') {
        const address: AddressOrderByInputArgs = {
          address: sort[0].desc ? SortOrder.desc : SortOrder.asc
        };
        orderBy.address = address;
      } else {
        orderBy[key as keyof CustomerOrderByInputArgs] = sort[0].desc ? SortOrder.desc : SortOrder.asc;
      }
    }
    return orderBy;
  }, []);

  const getFilter = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (queryString: string, filter: any) => ({
      user: userId ? { id: { equals: userId } } : undefined,
      active: { equals: true },
      query: queryString
    }),
    [userId]
  );

  const { loading, error, data, refetch } = useQuery<CustomersTableQueryType>(CustomersTableQuery, {
    variables: {
      first: pagination.pageSize,
      skip: pagination.pageIndex * pagination.pageSize,
      where: getFilter(query, filters),
      orderBy: getOrderBy(sortBy)
    }
  });

  const fetchData = useCallback(
    ({ pageIndex, pageSize, sortBy: newSortBy, filters: updatedFilters }: any) => {
      setPagination((prevState) => ({ ...prevState, pageIndex, pageSize }));
      setSortBy([...newSortBy]);
      setFilters(updatedFilters);
    },
    [setPagination, setSortBy]
  );

  useEffect(() => {
    refetch({
      first: pagination.pageSize,
      skip: pagination.pageIndex * pagination.pageSize,
      where: getFilter(query, filters),
      orderBy: getOrderBy(sortBy)
    });
  }, [pagination, query, sortBy, filters, getFilter, getOrderBy, refetch]);

  const onRowClick = useCallback(
    ({ original: { id } }: Row<CustomerNode>) => {
      push(`/customers/${id}`);
    },
    [push]
  );
  const menuVisible = allowDelete;
  const renderActions = useCallback(
    ({ id }: CustomerNode) => (
      <TableRowActions>
        <EditButton href={`/customers/${id}/edit`} />
        {menuVisible && (
          <TableRowMenu>
            {allowDelete && (
              <TableRowMenuItem>
                <DeleteButton onConfirm={() => deleteCustomer(id)} />
              </TableRowMenuItem>
            )}
          </TableRowMenu>
        )}
      </TableRowActions>
    ),
    [allowDelete, deleteCustomer, menuVisible]
  );

  const renderCustomerType = useCallback(({ type }: CustomerNode) => <CustomerTypeBadge type={type} />, []);
  const renderUserLink = useCallback(
    ({ user: { id, displayName } }: CustomerNode) => <Link href={`/admin/users/${id}`}>{displayName}</Link>,
    []
  );

  const totalItems = useMemo(() => data?.items?.totalCount || 0, [data]);
  const items = useMemo(() => data?.items?.edges?.map((x) => x.node) || [], [data]);

  const columns: Column<CustomerNode>[] = [
    {
      id: 'name',
      Header: t('labels.name'),
      accessor: ({ name, email, id }: CustomerNode) => ({
        title: name,
        avatarText: showId ? id : undefined,
        subtitle: email
      }),
      Cell: DefaultNameCell
    },
    ...(showUser
      ? [
          {
            id: 'user',
            Header: t('labels.user'),
            accessor: renderUserLink
          }
        ]
      : []),
    {
      id: 'address',
      Header: t('labels.address'),
      accessor: (row: CustomerNode) => row?.address?.address
    },
    {
      id: 'phoneNumber',
      Header: t('labels.phoneNumber'),
      accessor: 'phoneNumber'
    },
    {
      id: 'type',
      Header: t('labels.type'),
      accessor: renderCustomerType
    },
    {
      id: 'actions',
      Header: '',
      accessor: renderActions,
      disableSortBy: true
    }
  ];

  const Filters = (
    <div className="customer-table-filter table-filter">
      <SearchFilter value={query} onChange={setQuery} />
    </div>
  );

  return (
    <DataTable
      className="customer-table"
      columns={columns}
      data={items}
      fetchData={fetchData}
      loading={loading}
      totalItems={totalItems}
      pageIndex={pagination.pageIndex}
      pageSize={pagination.pageSize}
      sortBy={sortBy}
      error={error}
      onRowClick={onRowClick}
      filters={Filters}
    />
  );
}
