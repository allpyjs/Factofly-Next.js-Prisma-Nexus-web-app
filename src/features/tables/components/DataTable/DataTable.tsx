/* eslint-disable react/jsx-props-no-spreading */
import { Column } from 'react-table';
import classNames from 'classnames';
import { TransitionGroup } from 'react-transition-group';
import TableError from './TableError';
import PageSizeSelect from './PageSizeSelect';
import PageCountDisplay from './PageCountDisplay';
import PageLinks from './PageLinks';
import useDataTable, { SelectionChangedHandler } from './useDataTable';
import DataTableHeaders, { BulkActionComponent } from './DataTableHeaders';
import DataTableBody from './DataTableBody';

type DataTableProps<T extends object> = {
  className: string;
  columns: ReadonlyArray<Column<T>>;
  data: any[];
  fetchData: Function;
  totalItems: number;
  pageIndex: number;
  pageSize: number;
  loading: boolean;
  onRowClick?: Function;
  sortBy: any[];
  selectable?: boolean;
  expandable?: boolean;
  fixed?: boolean;
  onSelectionChange?: SelectionChangedHandler<T>;
  selectedRowIds?: Record<string, boolean>;
  error: boolean | any;
  subComponent?: Function;
  filters?: JSX.Element;
  bulkActions?: BulkActionComponent<T>;
};

function DataTable<T extends object>({
  className,
  columns,
  data,
  fetchData,
  loading,
  totalItems,
  pageIndex: initialPageIndex,
  pageSize: initialPageSize,
  onRowClick = undefined,
  sortBy: initialSortBy,
  selectable = false,
  expandable = false,
  fixed = false,
  onSelectionChange = undefined,
  subComponent = undefined,
  filters: filterComponent = undefined,
  bulkActions: actionComponent = undefined,
  selectedRowIds: initialSelectedRowIds = undefined,
  error
}: DataTableProps<T>) {
  const {
    state: { pageIndex, pageSize, selectedFlatRows },
    setPageSize,
    gotoPage,
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    sortedClass,
    hasFilter,
    visibleColumns,
    page,
    pageCount
  } = useDataTable({
    data,
    columns,
    fetchData,
    totalItems,
    initialPageIndex,
    initialPageSize,
    initialSortBy,
    selectable,
    expandable,
    onSelectionChange,
    initialSelectedRowIds
  });

  return (
    <>
      <div className="row">
        <div className="col-md pt-1">{filterComponent ?? null}</div>
        <div className="col-md pt-1">
          {!loading && (
            <PageSizeSelect pageSize={pageSize} totalItems={totalItems} onPageSizeChanged={setPageSize} />
          )}
        </div>
      </div>
      <div className={classNames('table-responsive', className)}>
        <TransitionGroup>
          <table
            className={classNames(
              'table table-lg table-borderless table-thead-bordered table-align-middle table-striped datatable-custom dataTable',
              { 'table-fixed': fixed }
            )}
            {...getTableProps()}
          >
            <DataTableHeaders
              sortedClass={sortedClass}
              headerGroups={headerGroups}
              hasFilter={hasFilter}
              selectedFlatRows={selectedFlatRows}
              bulkActions={actionComponent}
            />
            <DataTableBody
              getTableBodyProps={getTableBodyProps}
              prepareRow={prepareRow}
              visibleColumns={visibleColumns}
              page={page}
              subComponent={subComponent}
              loading={loading}
              onRowClick={onRowClick}
              expandable={expandable}
            />
          </table>
        </TransitionGroup>
      </div>
      {error && <TableError />}
      {!loading && (
        <div className="row">
          <div className="col-md">
            <PageCountDisplay pageSize={pageSize} totalItems={totalItems} pageIndex={pageIndex} />
          </div>
          <div className="col-md">
            <PageLinks pageIndex={pageIndex} pageCount={pageCount} onPageChanged={gotoPage} />
          </div>
        </div>
      )}
      <style jsx>{`
        @media (max-width: 600px) {
          .table-responsive {
            overflow: auto; // This causes problems with the column filter dropdowns
          }
        }
        table {
          border: 1px solid #dee2e6;
          border-radius: 3px;
        }
        table :global(th) {
          border-bottom: 1px solid #dee2e6;
        }
        table :global(tbody) :global(tr.clickable) {
          cursor: pointer;
        }
        table :global(tbody) :global(tr.clickable:hover) > :global(*) {
          --bs-table-accent-bg: #eff1f7;
        }
        table :global(th) {
          vertical-align: top;
        }
        table :global(.column-filters) {
          background: #e2e3e7;
          box-shadow: inset 0 0 30px 15px #bfbfbf;
        }
        table :global(.bulk-actions) {
          background: #e6f2ff;
        }
        table :global(.column-filters) :global(td) {
          padding: 10px;
        }
      `}</style>
    </>
  );
}

export default DataTable;
