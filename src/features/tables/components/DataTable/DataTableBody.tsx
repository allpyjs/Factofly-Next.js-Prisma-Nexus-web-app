/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { ColumnInstance, Row, TableBodyPropGetter, TableBodyProps } from 'react-table';
import { CSSTransition } from 'react-transition-group';

type DataTableBodyProps<T extends object> = {
  getTableBodyProps: (propGetter?: TableBodyPropGetter<T> | undefined) => TableBodyProps;
  page: Row<T>[];
  prepareRow: (row: Row<T>) => void;
  onRowClick: Function | undefined;
  subComponent: Function | undefined;
  expandable: boolean;
  visibleColumns: ColumnInstance<T>[];
  loading: boolean;
};

function DataTableBody<T extends object>({
  getTableBodyProps,
  page,
  prepareRow,
  onRowClick,
  subComponent,
  expandable,
  visibleColumns,
  loading
}: DataTableBodyProps<T>) {
  return (
    <>
      <tbody {...getTableBodyProps()}>
        <tr>
          <td colSpan={10000} className="p-0">
            <CSSTransition in={loading} timeout={300} classNames="table-loader" key="loader">
              <div className="table-loader progress rounded-0">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                  style={{ width: '100%' }}
                />
              </div>
            </CSSTransition>
          </td>
        </tr>
        {!loading &&
          page.map((row: any) => {
            prepareRow(row);
            return (
              <Fragment key={row.id}>
                <tr
                  className={classNames({ clickable: !!onRowClick })}
                  onClick={() => {
                    if (
                      onRowClick &&
                      // check that the user isn't clicking a link, input, or button
                      !document.querySelector('a:hover') &&
                      !document.querySelector('input:hover') &&
                      !document.querySelector('button:hover') &&
                      !document.querySelector('.no-click:hover')
                    ) {
                      onRowClick(row);
                    }
                  }}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell: any) => (
                    <td
                      {...cell.getCellProps()}
                      className={cell.column.clickable === false ? 'no-click' : ''}
                    >
                      <CSSTransition in={!loading} timeout={300} classNames="table-cell" key={row.id}>
                        <div>{cell.render('Cell')}</div>
                      </CSSTransition>
                    </td>
                  ))}
                </tr>
                {subComponent && (!expandable || row.isExpanded) && (
                  <tr>
                    <td colSpan={visibleColumns.length}>{subComponent({ row: row.original })}</td>
                  </tr>
                )}
              </Fragment>
            );
          })}
      </tbody>
      <style jsx>{`
        tbody :global(.progress) {
          height: 0.5rem;
        }
        tbody :global(.progress-bar) {
          background-color: #2d65d4 !important;
        }
        tbody :global(.table-loader-enter),
        tbody :global(.table-loader-exit-done) {
          opacity: 1;
          height: 0;
        }
        tbody :global(.table-loader-enter-active) {
          opacity: 1;
          height: 100%;
          transition: opacity 300ms, height 300ms;
        }
        tbody :global(.table-loader-exit) {
          opacity: 1;
          height: 100%;
        }
        tbody :global(.table-loader-exit-active) {
          opacity: 0;
          height: 0;
          transition: opacity 300ms, height 300ms;
        }

        tbody :global(.table-cell-enter) {
          opacity: 0;
          height: 0;
        }
        tbody :global(.table-cell-enter-active) {
          opacity: 1;
          height: 100%;
          transition: opacity 300ms, height 300ms;
        }
        tbody :global(.table-cell-exit) {
          opacity: 1;
          height: 100%;
        }
        tbody :global(.table-cell-exit-active) {
          opacity: 0;
          height: 0;
          transition: opacity 300ms, height 300ms;
        }
      `}</style>
    </>
  );
}

export default DataTableBody;
