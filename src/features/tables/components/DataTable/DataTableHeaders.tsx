/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment } from 'react';
import { HeaderGroup, Row } from 'react-table';

export type BulkActionComponent<T extends object> = (selectedRows: Row<T>[]) => JSX.Element;

type DataTableProps<T extends object> = {
  headerGroups: HeaderGroup<T>[];
  sortedClass: Function;
  hasFilter: Boolean;
  bulkActions?: BulkActionComponent<T>;
  selectedFlatRows: Row<T>[];
};

function DataTableHeaders<T extends object>({
  headerGroups,
  sortedClass,
  hasFilter,
  bulkActions,
  selectedFlatRows
}: DataTableProps<T>) {
  return (
    <thead className="thead-light user-select-none">
      {headerGroups.map((headerGroup: any) => (
        <Fragment key={`header-group-${headerGroup.name ?? 1}`}>
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th
                key={column.id}
                className={sortedClass(column.canSort, column.isSorted, column.isSortedDesc)}
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{ width: column.width }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
          {hasFilter && (
            <tr className="column-filters">
              {headerGroup.headers.map((column: any) => (
                <td key={column.id}>{column.Filter && <div>{column.render('Filter')}</div>}</td>
              ))}
            </tr>
          )}
          {selectedFlatRows && selectedFlatRows.length > 0 && bulkActions && (
            <tr className="bulk-actions">
              <td colSpan={999}>{bulkActions(selectedFlatRows)}</td>
            </tr>
          )}
        </Fragment>
      ))}
    </thead>
  );
}

export default DataTableHeaders;
