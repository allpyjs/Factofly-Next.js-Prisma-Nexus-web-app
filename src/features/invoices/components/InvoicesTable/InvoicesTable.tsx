/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Column, FilterProps, Row } from 'react-table';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { SingleValue } from 'react-select';
import InvoicesTableQuery from './graphql/InvoicesTableQuery.gql';
import DefaultNameCell, { DefaultNameCellValue } from '~/features/tables/components/DefaultNameCell';
import DataTable from '~/features/tables/components/DataTable';
import SearchFilter from '~/features/tables/components/SearchFilter';
import {
  InvoiceOrderByInputArgs,
  InvoiceStatusEnum,
  InvoiceStatusFilter,
  InvoiceWhereInputArgs,
  SortOrder
} from '../../../../.generated/globalTypes';
import { toDateString } from '~/utils/formatDate';
import {
  InvoicesTableQuery as InvoicesTableQueryType,
  InvoicesTableQuery_items_edges_node as InvoiceNode
} from './graphql/.generated/InvoicesTableQuery';
import CustomerColumnFilter from '~/features/customers/components/CustomerColumnFilter';
import InvoiceStatusColumnFilter from '../InvoiceStatusColumnFilter';
import InvoiceStatusBadge from '../InvoiceStatusBadge';
import formatCurrency from '../../../../utils/formatCurrency';
import TableRowMenu from '~/features/tables/components/TableRowMenu';
import TableRowActions from '~/features/tables/components/TableRowActions';
import useUser from '~/contexts/User/useUser';
import EditButton from '~/features/shared/components/EditButton';
import { SelectionChangedParams } from '~/features/tables/components/DataTable/useDataTable';
import InvoiceStatusSelect from '../InvoiceStatusSelect';
import useUpdateInvoices from '../../hooks/useUpdateInvoices';
import { SelectOption } from '~/features/forms/components/Select';
import InvoiceStatusButtons from '../InvoiceStatusButtons';
import convertNumber from '~/utils/convertNumber';

type InvoicesTableProps = {
  userId?: number;
  showUser?: boolean;
  showCustomer?: boolean;
  showId?: boolean;
  allowContractDownload?: boolean;
  allowBulkUpdate?: boolean;
  customerId?: number;
  openInvoicesOnly?: boolean;
};

export default function InvoicesTable({
  userId = undefined,
  showUser = false,
  showCustomer = true,
  showId = false,
  allowContractDownload = false,
  customerId = undefined,
  openInvoicesOnly = false,
  allowBulkUpdate = false
}: InvoicesTableProps) {
  const { t } = useTranslation('invoices');
  const { isAdmin } = useUser();
  const { push } = useRouter();

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sortBy, setSortBy] = useState<any>([]);
  const [filters, setFilters] = useState();
  const [query, setQuery] = useState('');

  const [selectedRowsIds, setSelectedRowsIds] = useState<Record<string, boolean>>({});
  const [selectedRows, setSelectedRows] = useState<Row<InvoiceNode>[]>([]);

  const onSelectionChange = useCallback((rows: SelectionChangedParams<InvoiceNode>) => {
    setSelectedRowsIds(rows.ids);
    setSelectedRows(rows.rows);
  }, []);

  const getOrderBy = useCallback((sort: any) => {
    const orderBy: InvoiceOrderByInputArgs = {};
    if (sort.length >= 1) {
      const key = sort[0].id;

      if (key === 'user') {
        orderBy.user = {
          firstName: sort[0].desc ? SortOrder.desc : SortOrder.asc
        };
      } else if (key === 'customer') {
        orderBy.customer = { name: sort[0].desc ? SortOrder.desc : SortOrder.asc };
      } else {
        orderBy[key as keyof InvoiceOrderByInputArgs] = sort[0].desc ? SortOrder.desc : SortOrder.asc;
      }
    } else {
      orderBy.id = SortOrder.desc;
    }

    return orderBy;
  }, []);

  const getFilter = useCallback(
    (queryString: string, filter: any): InvoiceWhereInputArgs => {
      const filterCustomerId = customerId || filter?.find((x: any) => x.id === 'customer')?.value;
      const status = filter?.find((x: any) => x.id === 'status')?.value;

      const statusFilter: InvoiceStatusFilter = {};
      if (status) statusFilter.in = [status];
      if (openInvoicesOnly) statusFilter.notIn = [InvoiceStatusEnum.CANCELLED, InvoiceStatusEnum.SALARY_PAID];
      return {
        user: userId ? { id: { equals: userId } } : undefined,
        active: { equals: true },
        query: queryString,
        customer: filterCustomerId ? { id: { equals: filterCustomerId } } : undefined,
        status: status || openInvoicesOnly ? statusFilter : undefined
      };
    },
    [userId, customerId, openInvoicesOnly]
  );

  const { loading, error, data, refetch } = useQuery<InvoicesTableQueryType>(InvoicesTableQuery, {
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
    ({ original: { id } }: Row<InvoiceNode>) => {
      push(`/invoices/${id}`);
    },
    [push]
  );

  const menuVisible = allowContractDownload;
  const renderActions = useCallback(
    ({ id, status }: InvoiceNode) => (
      <TableRowActions>
        {(status === InvoiceStatusEnum.DRAFT || isAdmin) && (
          <EditButton href={`/invoices/${id}/edit`} className="btn-sm" />
        )}
        {menuVisible && (
          <TableRowMenu>
            {allowContractDownload && (
              <Link href={`/api/invoice-contract/${id}`}>
                <a className="btn" style={{ width: 200 }}>
                  <i className="uil-file-shield-alt me-0" /> {t('buttons.downloadContract')}
                </a>
              </Link>
            )}
            <InvoiceStatusButtons invoiceId={id} invoiceStatus={status} />
          </TableRowMenu>
        )}
      </TableRowActions>
    ),
    [t, menuVisible, isAdmin, allowContractDownload]
  );

  const renderCustomerFilter = useCallback(
    ({ column }: FilterProps<InvoiceNode>) => <CustomerColumnFilter column={column} />,
    []
  );
  const renderStatusFilter = useCallback(
    ({ column }: FilterProps<InvoiceNode>) => <InvoiceStatusColumnFilter column={column} />,
    []
  );
  const renderStatus = useCallback(
    ({ status, overdue }: InvoiceNode) => (
      <>
        <InvoiceStatusBadge status={status} className="mb-1 me-1" />
        {isAdmin && status === InvoiceStatusEnum.SENT_TO_COMPANY && overdue && (
          <span className="badge bg-danger">{t('statuses.OVERDUE').toLowerCase()}</span>
        )}
      </>
    ),
    [isAdmin, t]
  );
  const renderUserLink = useCallback(
    ({ user: { id, displayName } }: InvoiceNode) => <Link href={`/admin/users/${id}`}>{displayName}</Link>,
    []
  );

  const [status, setStatus] = useState<InvoiceStatusEnum | undefined>();
  const [paidAmounts, setPaidAmounts] = useState<{ [key: number]: number }>({});

  const setPaidAmount = useCallback(
    (id: number, amount: number) => {
      setPaidAmounts((state) => ({
        ...state,
        [id]: amount
      }));
    },
    [setPaidAmounts]
  );

  const renderPaidAmount = useCallback(
    ({ id, paidAmountDkk, status: invoiceStatus }: InvoiceNode) =>
      invoiceStatus === InvoiceStatusEnum.PAID ? (
        formatCurrency(paidAmountDkk, 'dk', 'dkk')
      ) : (
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            value={paidAmounts[id]}
            onChange={(e) => {
              setPaidAmount(id, Number(e.target.value));
            }}
          />
          <span className="input-group-text">dkk</span>
        </div>
      ),
    [paidAmounts, setPaidAmount]
  );

  const totalItems = useMemo(() => data?.items?.totalCount || 0, [data]);
  const items = useMemo(() => data?.items?.edges?.map((x) => x.node) || [], [data]);

  const columns: Column<InvoiceNode>[] = [
    {
      id: 'reference',
      Header: t('labels.reference'),
      accessor: ({ id, visibleId, reference }: InvoiceNode): DefaultNameCellValue => ({
        title: (showId ? `${visibleId.toString()}: ` : '') + reference,
        avatarText: showId ? id.toString() : visibleId.toString()
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
            accessor: ({ customer: { name } }: InvoiceNode) => name,
            Filter: renderCustomerFilter
          }
        ]
      : []),
    {
      id: 'total',
      Header: t('labels.amount'),
      accessor: ({ totalPrice, currency }: InvoiceNode) => formatCurrency(totalPrice, 'dk', currency)
    },
    ...(status === InvoiceStatusEnum.PAID
      ? [
          {
            id: 'paidAmountDkk',
            Header: t('labels.paidAmount'),
            accessor: renderPaidAmount
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
      id: 'invoiceDate',
      Header: t('labels.invoiceDate'),
      accessor: ({ invoiceDate }: InvoiceNode) => toDateString(invoiceDate)
    },
    {
      id: 'actions',
      Header: '',
      accessor: renderActions,
      disableSortBy: true
    }
  ];

  const Filters = (
    <div className="invoices-table-filter table-filter">
      <SearchFilter value={query} onChange={setQuery} />
    </div>
  );

  const { updateInvoices } = useUpdateInvoices({
    onCompleted: () => {
      setStatus(undefined);
    }
  });

  const updateInvoicesHandler = useCallback(() => {
    if (status)
      updateInvoices(
        selectedRows.map((row) => ({
          where: { id: row.original.id },
          data: {
            status,
            paidAmountDkk:
              status === InvoiceStatusEnum.PAID ? convertNumber(paidAmounts[row.original.id])! : undefined
          }
        }))
      );
  }, [updateInvoices, status, selectedRows, paidAmounts]);

  const BulkActions = useCallback(
    (rows: Row<InvoiceNode>[]) => (
      <div className="invoices-table-actions table-actions d-flex flex-row justify-content-end">
        <span className="pt-1">{rows.length} invoices selected</span>
        <InvoiceStatusSelect
          className="w-25 mx-2"
          value={status}
          onChange={(option: SingleValue<SelectOption>) =>
            setStatus(option ? (option.value as InvoiceStatusEnum) : undefined)
          }
        />
        <button type="button" className="btn btn-primary" onClick={updateInvoicesHandler}>
          Update
        </button>
      </div>
    ),
    [status, updateInvoicesHandler, setStatus]
  );

  return (
    <DataTable
      className="invoice-table"
      columns={columns}
      data={items}
      fetchData={fetchData}
      loading={loading}
      totalItems={totalItems}
      selectable={allowBulkUpdate}
      selectedRowIds={selectedRowsIds}
      onSelectionChange={onSelectionChange}
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
