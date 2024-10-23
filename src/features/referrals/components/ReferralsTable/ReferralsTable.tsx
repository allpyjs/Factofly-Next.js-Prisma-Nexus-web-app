import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Column } from 'react-table';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import ReferralTableQuery from './graphql/ReferralsTableQuery.gql';
import {
  ReferralsTableQuery as ReferralTableQueryType,
  ReferralsTableQuery_items_edges_node as ReferralNode,
  ReferralsTableQuery_items_edges_node_user as ReferralUserNode
} from './graphql/.generated/ReferralsTableQuery';
import DataTable from '~/features/tables/components/DataTable';
import SearchFilter from '~/features/tables/components/SearchFilter';
import { ReferralOrderByInputArgs, SortOrder } from '../../../../.generated/globalTypes';

export default function ReferralsTable() {
  const { t } = useTranslation('referrals');

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sortBy, setSortBy] = useState<any>([]);
  const [query, setQuery] = useState('');

  const getOrderBy = useCallback((updateSortBy: any) => {
    const orderBy: ReferralOrderByInputArgs = {};
    if (updateSortBy.length >= 1) {
      const key = updateSortBy[0].id;
      orderBy[key as keyof ReferralOrderByInputArgs] = updateSortBy[0].desc ? SortOrder.desc : SortOrder.asc;
    } else {
      orderBy.updatedDate = SortOrder.desc;
    }
    return orderBy;
  }, []);

  const getFilter = useCallback(
    (queryString: string) => ({
      active: { equals: true },
      query: queryString
    }),
    []
  );

  const { loading, error, data, refetch } = useQuery<ReferralTableQueryType>(ReferralTableQuery, {
    variables: {
      first: pagination.pageSize,
      skip: pagination.pageIndex * pagination.pageSize,
      where: { query },
      orderBy: getOrderBy(sortBy)
    }
  });

  const renderUserLink = useCallback(
    ( user: ReferralUserNode | null) => user ? <Link href={`/admin/users/${user.id}`}>{user.displayName}</Link> : '',
    []
  );

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
      where: { query },
      orderBy: getOrderBy(sortBy)
    });
  }, [pagination, query, sortBy, getFilter, getOrderBy, refetch]);

  const totalItems = useMemo(() => data?.items?.totalCount || 0, [data]);
  const items = useMemo(() => data?.items?.edges?.map((x) => x.node) || [], [data]);

  const columns: Column<any>[] = [
    {
      id: 'id',
      Header: t('labels.user'),
      accessor: (referral: ReferralNode) => renderUserLink(referral.user)
    },
    {
      id: 'email',
      Header: t('labels.referredEmail'),
      accessor: 'email'
    },
    {
      id: 'userName',
      Header: t('labels.referredUser'),
      accessor: (referral: ReferralNode) => renderUserLink(referral.referredUser)
    },
    {
      id: 'status',
      Header: t('labels.status'),
      accessor: 'status'
    }
  ];

  const Filters = (
    <div className="user-table-filter table-filter">
      <SearchFilter value={query} onChange={setQuery} />
    </div>
  );

  return (
    <DataTable
      className="refferals-table"
      columns={columns}
      data={items}
      fetchData={fetchData}
      loading={loading}
      totalItems={totalItems}
      pageIndex={pagination.pageIndex}
      pageSize={pagination.pageSize}
      sortBy={sortBy}
      error={error}
      filters={Filters}
    />
  );
}
