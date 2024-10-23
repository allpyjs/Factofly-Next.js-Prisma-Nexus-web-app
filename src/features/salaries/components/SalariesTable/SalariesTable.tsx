/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Column, Row } from 'react-table';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import SalariesTableQuery from './graphql/SalariesTableQuery.gql';
import DefaultNameCell, { DefaultNameCellValue } from '~/features/tables/components/DefaultNameCell';
import DataTable from '~/features/tables/components/DataTable';
import SearchFilter from '~/features/tables/components/SearchFilter';
import {
  SalaryOrderByInputArgs,
  SalaryStatusEnum,
  SalaryStatusFilter,
  SalaryWhereInputArgs,
  SortOrder
} from '../../../../.generated/globalTypes';
import { toDateString } from '~/utils/formatDate';
import {
  SalariesTableQuery as SalariesTableQueryType,
  SalariesTableQuery_items_edges_node as SalaryNode,
  SalariesTableQuery_items_edges_node_invoices as InvoiceNode
} from './graphql/.generated/SalariesTableQuery';
import SalaryStatusBadge from '../SalaryStatusBadge';
import formatCurrency from '~/utils/formatCurrency';
import useUser from '~/contexts/User/useUser';

type SalariesTableProps = {
  userId?: number;
  showUser?: boolean;
  status?: SalaryStatusEnum;
};

export default function SalariesTable({ userId = undefined, showUser = false, status }: SalariesTableProps) {
  const { t } = useTranslation('salaries');
  const { push } = useRouter();
  const { isAdmin } = useUser();

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sortBy, setSortBy] = useState<any>([]);
  const [filters, setFilters] = useState();
  const [query, setQuery] = useState('');

  const getOrderBy = useCallback((sort: any) => {
    const orderBy: SalaryOrderByInputArgs = {};
    if (sort.length >= 1) {
      const key = sort[0].id;

      if (key === 'user') {
        orderBy.user = {
          firstName: sort[0].desc ? SortOrder.desc : SortOrder.asc
        };
      } else {
        orderBy[key as keyof SalaryOrderByInputArgs] = sort[0].desc ? SortOrder.desc : SortOrder.asc;
      }
    } else {
      orderBy.id = SortOrder.desc;
    }

    return orderBy;
  }, []);

  const getFilter = useCallback(
    (queryString: string, filter: any): SalaryWhereInputArgs => {
      const statusFilterValue = filter?.find((x: any) => x.id === 'status')?.value;

      const statusFilter: SalaryStatusFilter = {};
      if (statusFilterValue || status) statusFilter.in = [statusFilterValue ?? status];
      return {
        user: userId ? { id: { equals: userId } } : undefined,
        query: queryString,
        status: statusFilter
      };
    },
    [userId, status]
  );

  const { loading, error, data, refetch } = useQuery<SalariesTableQueryType>(SalariesTableQuery, {
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
    ({ original: { id } }: Row<SalaryNode>) => {
      push(`${isAdmin ? '/admin' : ''}/salaries/${id}`);
    },
    [push, isAdmin]
  );

  const renderStatus = useCallback(
    ({ status: salaryStatus }: SalaryNode) => <SalaryStatusBadge status={salaryStatus} />,
    []
  );
  const renderUserLink = useCallback(
    ({ user: { id, displayName } }: SalaryNode) => <Link href={`/admin/users/${id}`}>{displayName}</Link>,
    []
  );

  function calculateTotal(invoices: InvoiceNode[]) {
    return (
      invoices?.reduce((prev, current) => prev + current.subtotalDkk * (current.includeVat ? 1.25 : 1), 0) ??
      0
    );
  }

  const totalItems = useMemo(() => data?.items?.totalCount || 0, [data]);
  const items = useMemo(() => data?.items?.edges?.map((x) => x.node) || [], [data]);

  const columns: Column<SalaryNode>[] = [
    {
      id: 'reference',
      Header: t('labels.reference'),
      accessor: ({ id, invoices }: SalaryNode): DefaultNameCellValue => ({
        title: formatCurrency(invoices ? calculateTotal(invoices) : 0, 'dk', 'dkk'),
        avatarText: id.toString()
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
      id: 'status',
      Header: t('labels.status'),
      accessor: renderStatus
    },
    {
      id: 'grossIncome',
      Header: t('labels.grossIncome'),
      accessor: ({ grossIncome }: SalaryNode) => formatCurrency(grossIncome, 'dk', 'dkk')
    },
    {
      id: 'paymentAmount',
      Header: t('labels.paymentAmount'),
      accessor: ({ paymentAmount }: SalaryNode) => formatCurrency(paymentAmount, 'dk', 'dkk')
    },
    {
      id: 'paymentDate',
      Header: t('labels.paymentDate'),
      accessor: ({ paymentDate }: SalaryNode) => toDateString(paymentDate)
    }
  ];

  const Filters = (
    <div className="salaries-table-filter table-filter">
      <SearchFilter value={query} onChange={setQuery} />
    </div>
  );

  const BulkActions = useCallback(
    (rows: Row<SalaryNode>[]) => (
      <div className="invoices-table-actions table-actions d-flex flex-row justify-content-end">
        <span className="pt-1">{rows.length} salaries selected</span>
        <a
          className="btn btn-primary ms-1"
          href={`/api/bank-file?ids=${rows.map((x) => x.original.id).join(',')}`}
          download
        >
          <i className="uil-file-download" /> Export Payments
        </a>
      </div>
    ),
    []
  );

  return (
    <DataTable
      className="salary-table"
      columns={columns}
      data={items}
      fetchData={fetchData}
      loading={loading}
      totalItems={totalItems}
      selectable
      pageIndex={pagination.pageIndex}
      pageSize={pagination.pageSize}
      sortBy={sortBy}
      error={error}
      onRowClick={onRowClick}
      filters={Filters}
      bulkActions={BulkActions}
    />
  );
}
