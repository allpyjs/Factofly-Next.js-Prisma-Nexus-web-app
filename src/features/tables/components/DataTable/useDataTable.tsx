/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useMemo } from 'react';
import {
  useTable,
  usePagination,
  useSortBy,
  useRowSelect,
  useExpanded,
  Column,
  useFilters,
  useGlobalFilter,
  Row,
  IdType
} from 'react-table';
import RowSelectCheckbox from './RowSelectCheckbox';

export type SelectionChangedHandler<T extends object> = (input: SelectionChangedParams<T>) => void;

export type SelectionChangedParams<T extends object> = {
  rows: Row<T>[];
  ids: Record<IdType<T>, boolean>;
};

type UseDataTableParams<T extends object> = {
  columns: ReadonlyArray<Column<T>>;
  data: any[];
  fetchData: Function;
  totalItems: number;

  initialPageIndex: number;
  initialPageSize: number;
  initialSortBy: any[];
  initialSelectedRowIds?: Record<string, boolean>;

  selectable?: boolean;
  expandable?: boolean;
  onSelectionChange?: SelectionChangedHandler<T>;
};

export default function useDataTable<T extends object>({
  columns,
  data,
  fetchData,
  totalItems,

  initialPageIndex,
  initialPageSize,
  initialSortBy,
  initialSelectedRowIds = {},

  selectable = false,
  expandable = false,
  onSelectionChange = undefined
}: UseDataTableParams<T>) {
  const defaultColumn = useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 30, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 200 // maxWidth is only used as a limit for resizing
    }),
    []
  );

  const renderRowSelectHeader = useCallback(
    ({ getToggleAllRowsSelectedProps }: any) => <RowSelectCheckbox {...getToggleAllRowsSelectedProps()} />,
    []
  );

  const renderRowSelectCell = useCallback(
    ({ row }: any) => <RowSelectCheckbox {...row.getToggleRowSelectedProps()} />,
    []
  );

  const renderExpandableCell = useCallback(
    ({ row }: any) => (
      <span
        {...row.getToggleRowExpandedProps({
          style: {
            paddingLeft: `${row.depth * 2}rem`
          }
        })}
      >
        {row.isExpanded ? <i className="tio tio-up-ui" /> : <i className="tio tio-down-ui" />}
      </span>
    ),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    visibleColumns,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, sortBy, selectedRowIds, filters }
  } = useTable<T>(
    {
      columns,
      data,
      state: {
        pageIndex: initialPageIndex,
        pageSize: initialPageSize,
        sortBy: initialSortBy,
        selectedRowIds: initialSelectedRowIds
      },
      pageCount: -1,
      manualPagination: true,
      manualSortBy: true,
      manualFilters: true,
      disableMultiSort: true,
      defaultColumn,
      defaultCanFilter: false,
      disableFilters: true
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks: any) => {
      if (selectable) {
        hooks.visibleColumns.push((cols: any) => [
          {
            id: 'selection',
            Header: renderRowSelectHeader,
            Cell: renderRowSelectCell,
            width: 20,
            clickable: false
          },
          ...cols
        ]);
      }
      if (expandable) {
        hooks.visibleColumns.push((cols: any) => [
          ...cols,
          {
            id: 'expand',
            Header: () => null,
            Cell: renderExpandableCell,
            width: 50,
            clickable: false
          }
        ]);
      }
    }
  );

  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    fetchData({ pageIndex, pageSize, sortBy, filters });
  }, [fetchData, pageIndex, pageSize, sortBy, filters]);

  useEffect(() => {
    if (onSelectionChange) {
      // Do a quick deep comparison using stringify, otherwise the event continuously fires
      if (JSON.stringify(initialSelectedRowIds) !== JSON.stringify(selectedRowIds)) {
        onSelectionChange({ rows: selectedFlatRows, ids: selectedRowIds });
      }
    }
  }, [onSelectionChange, selectedFlatRows.length, selectedFlatRows, selectedRowIds, initialSelectedRowIds]);

  const sortedClass = (canSort: boolean, isSorted: boolean, isSortedDesc: boolean) => {
    if (!canSort) return 'sorting_disabled';
    if (isSorted && isSortedDesc) return 'sorting sorting_desc';
    if (isSorted && !isSortedDesc) return 'sorting sorting_asc';
    return 'sorting';
  };

  const pageCount = Math.ceil(totalItems / pageSize);
  const hasFilter = columns.filter((column) => column?.Filter !== undefined).length > 0;

  return {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    visibleColumns,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, sortBy, selectedRowIds, filters, selectedFlatRows },
    sortedClass,
    hasFilter,
    pageCount
  };
}
