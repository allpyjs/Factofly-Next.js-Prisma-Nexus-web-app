/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Column, FilterProps, Row } from 'react-table';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import DeductionsTableQuery from './graphql/DeductionsTableQuery.gql';
import {
  DeductionsTableQuery as DeductionsTableQueryType,
  DeductionsTableQuery_items_edges_node as DeductionNode
} from './graphql/.generated/DeductionsTableQuery';
import DefaultNameCell from '~/features/tables/components/DefaultNameCell';
import DataTable from '~/features/tables/components/DataTable';
import SearchFilter from '~/features/tables/components/SearchFilter';
import {
  DeductionOrderByInputArgs,
  DeductionStatusEnum,
  SortOrder
} from '../../../../.generated/globalTypes';
import { toDateString } from '~/utils/formatDate';
import DeductionStatusColumnFilter from '../DeductionStatusColumnFilter';
import DeductionStatusBadge from '../DeductionStatusBadge';
import TableRowMenu from '~/features/tables/components/TableRowMenu';
import TableRowActions from '~/features/tables/components/TableRowActions';
import EditButton from '~/features/shared/components/EditButton';
import DeleteButton from '~/features/shared/components/DeleteButton';
import TableRowMenuItem from '~/features/tables/components/TableRowMenuItem';
import useDeleteDeduction from '../../hooks/useDeleteDeductions';
import useUser from '~/contexts/User/useUser';
import formatCurrency from '~/utils/formatCurrency';

type DeductionsTableProps = {
  userId?: number;
  allowDelete?: boolean;
  showUser?: boolean;
  showId?: boolean;
};

export default function DeductionsTable({
  userId = undefined,
  showUser = false,
  showId = false,
  allowDelete = true
}: DeductionsTableProps) {
  const { isAdmin } = useUser();
  const { t } = useTranslation('deductions');
  const { deleteDeduction } = useDeleteDeduction();

  const { push } = useRouter();

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sortBy, setSortBy] = useState<any>([]);
  const [filters, setFilters] = useState();
  const [query, setQuery] = useState('');

  const getOrderBy = useCallback((sort: any) => {
    const orderBy: DeductionOrderByInputArgs = {};
    if (sort.length >= 1) {
      const key = sort[0].id;
      if (key === 'user') {
        orderBy.user = {
          firstName: sort[0].desc ? SortOrder.desc : SortOrder.asc
        };
      } else {
        orderBy[key as keyof DeductionOrderByInputArgs] = sort[0].desc ? SortOrder.desc : SortOrder.asc;
      }
    } else {
      orderBy.createdDate = SortOrder.desc;
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

  const { loading, error, data, refetch } = useQuery<DeductionsTableQueryType>(DeductionsTableQuery, {
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
    ({ original: { id } }: Row<DeductionNode>) => {
      push(`/deductions/${id}`);
    },
    [push]
  );

  const renderActions = useCallback(
    ({ id, status }: DeductionNode) => {
      const canDelete = allowDelete && (status === DeductionStatusEnum.DRAFT || isAdmin);
      const menuVisible = canDelete;
      return (
        <TableRowActions>
          <EditButton href={`/deductions/${id}/edit`} />
          {menuVisible && (
            <TableRowMenu>
              {canDelete && (
                <TableRowMenuItem>
                  <DeleteButton onConfirm={() => deleteDeduction(id)} />
                </TableRowMenuItem>
              )}
            </TableRowMenu>
          )}
        </TableRowActions>
      );
    },
    [allowDelete, deleteDeduction, isAdmin]
  );

  const renderStatusFilter = useCallback(
    ({ column }: FilterProps<DeductionNode>) => <DeductionStatusColumnFilter column={column} />,
    []
  );
  const renderStatus = useCallback(
    ({ status }: DeductionNode) => <DeductionStatusBadge status={status} />,
    []
  );
  const renderUserLink = useCallback(
    ({ user: { id, displayName } }: DeductionNode) => <Link href={`/admin/users/${id}`}>{displayName}</Link>,
    []
  );

  const totalItems = useMemo(() => data?.items?.totalCount || 0, [data]);
  const items = useMemo(() => data?.items?.edges?.map((x) => x.node) || [], [data]);

  const columns: Column<DeductionNode>[] = [
    {
      id: 'description',
      Header: t('labels.description'),
      accessor: ({ description, id }: DeductionNode) => ({
        title: description,
        avatarText: showId ? id : undefined
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
      id: 'status',
      Header: t('labels.status'),
      accessor: renderStatus,
      Filter: renderStatusFilter
    },
    {
      id: 'total',
      Header: t('labels.total'),
      accessor: ({ total, currency }: DeductionNode) =>
        currency && total ? formatCurrency(total, 'dk', currency) : null
    },
    {
      id: 'createdDate',
      Header: t('labels.createdDate'),
      accessor: ({ createdDate }: DeductionNode) => toDateString(createdDate)
    },
    {
      id: 'actions',
      Header: '',
      accessor: renderActions,
      disableSortBy: true
    }
  ];

  const Filters = (
    <div className="deduction-table-filter table-filter">
      <SearchFilter value={query} onChange={setQuery} />
    </div>
  );

  return (
    <DataTable
      className="deduction-table"
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
