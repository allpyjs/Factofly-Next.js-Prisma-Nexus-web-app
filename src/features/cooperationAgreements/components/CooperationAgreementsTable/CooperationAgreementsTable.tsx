/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Column, Row } from 'react-table';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import CooperationAgreementsTableQuery from './graphql/CooperationAgreementsTableQuery.gql';
import {
  CooperationAgreementsTableQuery as CooperationAgreementsTableQueryType,
  CooperationAgreementsTableQuery_items_edges_node as CooperationAgreementNode
} from './graphql/.generated/CooperationAgreementsTableQuery';
import DefaultNameCell from '~/features/tables/components/DefaultNameCell';
import DataTable from '~/features/tables/components/DataTable';
import SearchFilter from '~/features/tables/components/SearchFilter';
import { CooperationAgreementOrderByInputArgs, SortOrder } from '../../../../.generated/globalTypes';
import { toDateString } from '~/utils/formatDate';
import TableRowMenu from '~/features/tables/components/TableRowMenu';
import TableRowActions from '~/features/tables/components/TableRowActions';
import EditButton from '~/features/shared/components/EditButton';
import DeleteButton from '~/features/shared/components/DeleteButton';
import TableRowMenuItem from '~/features/tables/components/TableRowMenuItem';
import useDeleteCooperationAgreement from '../../hooks/useDeleteCooperationAgreements';

type CooperationAgreementsTableProps = {
  userId?: number;
  allowDelete?: boolean;
  showUser?: boolean;
  showId?: boolean;
};

export default function CooperationAgreementsTable({
  userId = undefined,
  showUser = false,
  showId = false,
  allowDelete = true
}: CooperationAgreementsTableProps) {
  const { t } = useTranslation('cooperationAgreements');
  const { deleteCooperationAgreement } = useDeleteCooperationAgreement();

  const { push } = useRouter();

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sortBy, setSortBy] = useState<any>([]);
  const [filters, setFilters] = useState();
  const [query, setQuery] = useState('');

  const getOrderBy = useCallback((sort: any) => {
    const orderBy: CooperationAgreementOrderByInputArgs = {};
    if (sort.length >= 1) {
      const key = sort[0].id;
      if (key === 'user') {
        orderBy.user = {
          firstName: sort[0].desc ? SortOrder.desc : SortOrder.asc
        };
      } else {
        orderBy[key as keyof CooperationAgreementOrderByInputArgs] = sort[0].desc
          ? SortOrder.desc
          : SortOrder.asc;
      }
    }
    return orderBy;
  }, []);

  const getFilter = useCallback(
    (queryString: string, filter: any) => {
      const status = filter?.find((x: any) => x.id === 'status')?.value;
      return {
        user: userId ? { id: { equals: userId } } : undefined,
        query: queryString,
        active: { equals: true },
        status: status ? { equals: status } : undefined
      };
    },
    [userId]
  );

  const { loading, error, data, refetch } = useQuery<CooperationAgreementsTableQueryType>(
    CooperationAgreementsTableQuery,
    {
      variables: {
        first: pagination.pageSize,
        skip: pagination.pageIndex * pagination.pageSize,
        where: getFilter(query, filters),
        orderBy: getOrderBy(sortBy)
      }
    }
  );

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
  const renderUserLink = useCallback(
    ({ user: { id, displayName } }: CooperationAgreementNode) => (
      <Link href={`/admin/users/${id}`}>{displayName}</Link>
    ),
    []
  );

  const onRowClick = useCallback(
    ({ original: { id } }: Row<CooperationAgreementNode>) => {
      push(`/cooperations/${id}`);
    },
    [push]
  );

  const menuVisible = allowDelete;
  const renderActions = useCallback(
    ({ id }: CooperationAgreementNode) => (
      <TableRowActions>
        <EditButton href={`/cooperations/${id}/edit`} />
        {menuVisible && (
          <TableRowMenu>
            {allowDelete && (
              <TableRowMenuItem>
                <DeleteButton onConfirm={() => deleteCooperationAgreement(id)} />
              </TableRowMenuItem>
            )}
          </TableRowMenu>
        )}
      </TableRowActions>
    ),
    [menuVisible, allowDelete, deleteCooperationAgreement]
  );

  const totalItems = useMemo(() => data?.items?.totalCount || 0, [data]);
  const items = useMemo(() => data?.items?.edges?.map((x) => x.node) || [], [data]);

  const columns: Column<CooperationAgreementNode>[] = [
    {
      id: 'startDate',
      Header: t('labels.description'),
      accessor: ({ customer: { name }, id, startDate, endDate }: CooperationAgreementNode) => ({
        title: name,
        subtitle: toDateString(startDate) + (endDate ? ` - ${toDateString(endDate)}` : ''),
        avatarText: showId ? id.toString() : undefined
      }),
      Cell: DefaultNameCell,
      width: 250
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
      id: 'createdDate',
      Header: t('labels.createdDate'),
      accessor: ({ createdDate }: CooperationAgreementNode) => toDateString(createdDate)
    },
    {
      id: 'paymentTerms',
      Header: t('labels.paymentTerm'),
      accessor: ({ paymentTerm }: CooperationAgreementNode) => t(`paymentTerms.${paymentTerm}`),
      disableSortBy: true
    },
    {
      id: 'paymentTermDays',
      Header: t('labels.paymentTermDays'),
      accessor: ({ paymentTermDays }: CooperationAgreementNode) => paymentTermDays,
      disableSortBy: true
    },
    {
      id: 'actions',
      Header: '',
      accessor: renderActions,
      disableSortBy: true
    }
  ];

  const Filters = (
    <div className="cooperationAgreement-table-filter table-filter">
      <SearchFilter value={query} onChange={setQuery} />
    </div>
  );

  return (
    <DataTable
      className="cooperationAgreement-table"
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
