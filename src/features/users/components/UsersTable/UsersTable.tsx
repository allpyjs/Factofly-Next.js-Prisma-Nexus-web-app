import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Column, Row } from 'react-table';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import UsersTableQuery from './graphql/UsersTableQuery.gql';
import {
  UsersTableQuery as UsersTableQueryType,
  UsersTableQuery_items_edges_node as UserNode
} from './graphql/.generated/UsersTableQuery';
import DefaultNameCell from '~/features/tables/components/DefaultNameCell';
import DataTable from '~/features/tables/components/DataTable';
import SearchFilter from '~/features/tables/components/SearchFilter';
import { UserOrderByInputArgs, SortOrder, AddressOrderByInputArgs } from '../../../../.generated/globalTypes';
import { toDateTimeString } from '~/utils/formatDate';
import TableRowActions from '~/features/tables/components/TableRowActions';
import EditButton from '~/features/shared/components/EditButton';
import TableRowMenu from '~/features/tables/components/TableRowMenu';
import useUser from '~/contexts/User/useUser';

export default function UsersTable() {
  const { t } = useTranslation('users');

  const { impersonateUser } = useUser();

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sortBy, setSortBy] = useState<any>([]);
  const [query, setQuery] = useState('');
  const { push } = useRouter();

  const getOrderBy = useCallback((updateSortBy: any) => {
    const orderBy: UserOrderByInputArgs = {};
    if (updateSortBy.length >= 1) {
      const key = updateSortBy[0].id;
      if (key === 'address') {
        const address: AddressOrderByInputArgs = {
          address: updateSortBy[0].desc ? SortOrder.desc : SortOrder.asc
        };
        orderBy.address = address;
      } else {
        orderBy[key as keyof UserOrderByInputArgs] = updateSortBy[0].desc ? SortOrder.desc : SortOrder.asc;
      }
    } else {
      orderBy.updatedDate = SortOrder.desc;
    }
    return orderBy;
  }, []);

  const getFilter = useCallback(
    (queryString: string) => ({
      // active: { equals: true },
      query: queryString
    }),
    []
  );

  const { loading, error, data, refetch } = useQuery<UsersTableQueryType>(UsersTableQuery, {
    variables: {
      first: pagination.pageSize,
      skip: pagination.pageIndex * pagination.pageSize,
      where: getFilter(query),
      orderBy: getOrderBy(sortBy)
    }
  });

  const fetchData = useCallback(
    ({ pageIndex, pageSize, sortBy: newSortBy }: any) => {
      setPagination((prevState) => ({ ...prevState, pageIndex, pageSize }));
      setSortBy([...newSortBy]);
    },
    [setPagination, setSortBy]
  );

  useEffect(() => {
    refetch({
      first: pagination.pageSize,
      skip: pagination.pageIndex * pagination.pageSize,
      where: getFilter(query),
      orderBy: getOrderBy(sortBy)
    });
  }, [pagination, query, sortBy, getFilter, getOrderBy, refetch]);

  const onRowClick = useCallback(
    ({ original: { id } }: Row<UserNode>) => {
      push(`/admin/users/${id}`);
    },
    [push]
  );

  const renderActions = useCallback(
    ({ id }: UserNode) => (
      <TableRowActions>
        <EditButton href={`/admin/users/${id}/edit`} />
        <TableRowMenu>
          <button
            className="btn"
            type="button"
            style={{ width: 200 }}
            onClick={() => {
              impersonateUser!(id);
            }}
          >
            <i className="uil-constructor me-0" /> {t('buttons.impersonate')}
          </button>
        </TableRowMenu>
      </TableRowActions>
    ),
    [t, impersonateUser]
  );

  const totalItems = useMemo(() => data?.items?.totalCount || 0, [data]);
  const items = useMemo(() => data?.items?.edges?.map((x) => x.node) || [], [data]);

  const columns: Column<UserNode>[] = [
    {
      id: 'email',
      Header: 'Name',
      accessor: ({ displayName, email, id }: UserNode) => ({
        title: displayName,
        subtitle: email,
        avatarText: id
      }),
      Cell: DefaultNameCell
    },
    {
      id: 'phoneNumber',
      Header: 'Phone',
      accessor: 'phoneNumber'
    },
    {
      id: 'referral',
      Header: 'Referral',
      accessor: 'referral'
    },
    {
      id: 'userSpecifiedReferral',
      Header: t('labels.userSpecifiedReferral_short'),
      accessor: 'userSpecifiedReferral'
    },
    {
      id: 'freelancerSituation',
      Header: t('labels.freelancerSituation_short'),
      accessor: 'freelancerSituation'
    },
    {
      id: 'createdDate',
      Header: t('labels.createdDate'),
      accessor: ({ createdDate }: UserNode) => toDateTimeString(createdDate)
    },
    {
      id: 'lastActive',
      Header: t('labels.lastActive'),
      accessor: ({ lastActive }: UserNode) => toDateTimeString(lastActive)
    },
    {
      id: 'actions',
      Header: '',
      accessor: renderActions,
      disableSortBy: true
    }
  ];

  const Filters = (
    <div className="user-table-filter table-filter">
      <SearchFilter value={query} onChange={setQuery} />
    </div>
  );

  return (
    <DataTable
      className="user-table"
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
