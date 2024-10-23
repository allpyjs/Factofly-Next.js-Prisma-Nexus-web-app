/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Column, FilterProps, Row } from 'react-table';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import TasksTableQuery from './graphql/TasksTableQuery.gql';
import {
  TasksTableQuery as TasksTableQueryType,
  TasksTableQuery_items_edges_node as TaskNode
} from './graphql/.generated/TasksTableQuery';
import DefaultNameCell from '~/features/tables/components/DefaultNameCell';
import DataTable from '~/features/tables/components/DataTable';
import SearchFilter from '~/features/tables/components/SearchFilter';
import {
  TaskOrderByInputArgs,
  SortOrder,
  TaskStatusEnum,
  TaskStatusFilter
} from '../../../../.generated/globalTypes';
import { toDateString } from '~/utils/formatDate';
import CustomerColumnFilter from '~/features/customers/components/CustomerColumnFilter';
import TaskStatusColumnFilter from '../TaskStatusColumnFilter';
import TaskStatusBadge from '../TaskStatusBadge';
import TableRowMenu from '~/features/tables/components/TableRowMenu';
import TableRowActions from '~/features/tables/components/TableRowActions';
import EditButton from '~/features/shared/components/EditButton';
import useDeleteTask from '../../hooks/useDeleteTask';
import TableRowMenuItem from '~/features/tables/components/TableRowMenuItem';
import DeleteButton from '~/features/shared/components/DeleteButton';
import useUser from '~/contexts/User/useUser';

type TasksTableProps = {
  userId?: number;
  showUser?: boolean;
  showId?: boolean;
  showCustomer?: boolean;
  allowContractDownload?: boolean;
  allowDelete?: boolean;
  customerId?: number;
  openTasksOnly?: boolean;
};

export default function TasksTable({
  userId = undefined,
  showUser = false,
  showId = false,
  showCustomer = true,
  allowContractDownload = false,
  allowDelete = false,
  customerId = undefined,
  openTasksOnly = false
}: TasksTableProps) {
  const { t } = useTranslation('tasks');
  const { deleteTask } = useDeleteTask();
  const { push } = useRouter();
  const { isAdmin } = useUser();

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sortBy, setSortBy] = useState<any>([]);
  const [filters, setFilters] = useState();
  const [query, setQuery] = useState('');

  const getOrderBy = useCallback((sort: any) => {
    const orderBy: TaskOrderByInputArgs = {};
    if (sort.length >= 1) {
      const key = sort[0].id;
      if (key === 'user') {
        orderBy.user = {
          firstName: sort[0].desc ? SortOrder.desc : SortOrder.asc
        };
      } else if (key === 'customer') {
        orderBy.customer = { name: sort[0].desc ? SortOrder.desc : SortOrder.asc };
      } else {
        orderBy[key as keyof TaskOrderByInputArgs] = sort[0].desc ? SortOrder.desc : SortOrder.asc;
      }
    } else {
      orderBy.id = SortOrder.desc;
    }
    return orderBy;
  }, []);

  const getFilter = useCallback(
    (queryString: string, filter: any) => {
      const filterCustomerId = customerId || filter?.find((x: any) => x.id === 'customer')?.value;
      const status = filter?.find((x: any) => x.id === 'status')?.value;

      const statusFilter: TaskStatusFilter = {};
      if (status) statusFilter.in = [status];
      if (openTasksOnly) statusFilter.notIn = [TaskStatusEnum.APPROVED];
      return {
        user: userId ? { id: { equals: userId } } : undefined,
        active: { equals: true },
        query: queryString,
        customer: filterCustomerId ? { id: { equals: filterCustomerId } } : undefined,
        status: status || openTasksOnly ? statusFilter : undefined
      };
    },
    [userId, customerId, openTasksOnly]
  );

  const { loading, error, data, refetch } = useQuery<TasksTableQueryType>(TasksTableQuery, {
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
  }, [pagination, query, sortBy, getFilter, getOrderBy, refetch, filters]);

  const onRowClick = useCallback(
    ({ original: { id } }: Row<TaskNode>) => {
      push(`/tasks/${id}`);
    },
    [push]
  );

  const menuVisible = allowContractDownload || allowDelete;
  const renderActions = useCallback(
    ({ id, status }: TaskNode) => (
      <TableRowActions>
        {(status === TaskStatusEnum.DRAFT || isAdmin) && <EditButton href={`/tasks/${id}/edit`} />}
        {menuVisible && (
          <TableRowMenu>
            {allowContractDownload && (
              <TableRowMenuItem>
                <Link href={`/api/task-contract/${id}`}>
                  <a className="btn" style={{ width: 200 }}>
                    <i className="uil-file-shield-alt me-0" /> {t('buttons.downloadContract')}
                  </a>
                </Link>
              </TableRowMenuItem>
            )}
            {allowDelete && (
              <TableRowMenuItem>
                <DeleteButton onConfirm={() => deleteTask(id)} />
              </TableRowMenuItem>
            )}
          </TableRowMenu>
        )}
      </TableRowActions>
    ),
    [menuVisible, allowDelete, allowContractDownload, isAdmin, deleteTask, t]
  );

  const taskStatusAccessor = useCallback(({ status }: TaskNode) => <TaskStatusBadge status={status} />, []);
  const renderCustomerFilter = useCallback(
    ({ column }: FilterProps<TaskNode>) => <CustomerColumnFilter column={column} />,
    []
  );
  const renderStatusFilter = useCallback(
    ({ column }: FilterProps<TaskNode>) => <TaskStatusColumnFilter column={column} />,
    []
  );
  const renderUserLink = useCallback(
    ({ user: { id, displayName } }: TaskNode) => <Link href={`/admin/users/${id}`}>{displayName}</Link>,
    []
  );

  const totalItems = useMemo(() => data?.items?.totalCount || 0, [data]);
  const items = useMemo(() => data?.items?.edges?.map((x) => x.node) || [], [data]);

  const columns: Column<TaskNode>[] = [
    {
      id: 'title',
      Header: t('labels.title'),
      accessor: ({ title, id, reference }: TaskNode) => ({
        title,
        subtitle: reference,
        avatarText: showId ? id : undefined
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
    ...(showCustomer
      ? [
          {
            id: 'customer',
            Header: t('labels.customer'),
            accessor: ({ customer: { name } }: TaskNode) => name,
            Filter: renderCustomerFilter
          }
        ]
      : []),
    {
      id: 'status',
      Header: t('labels.status'),
      accessor: taskStatusAccessor,
      Filter: renderStatusFilter
    },
    {
      id: 'startDate',
      Header: t('labels.startDate'),
      accessor: ({ startDate }: TaskNode) => toDateString(startDate)
    },
    {
      id: 'endDate',
      Header: t('labels.endDate'),
      accessor: ({ endDate }: TaskNode) => toDateString(endDate)
    },
    {
      id: 'actions',
      Header: '',
      accessor: renderActions,
      disableSortBy: true
    }
  ];

  const Filters = (
    <div className="task-table-filter table-filter">
      <SearchFilter value={query} onChange={setQuery} />
    </div>
  );

  return (
    <DataTable
      className="task-table"
      selectable={false}
      selectedRowIds={{}}
      onSelectionChange={() => {}}
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
