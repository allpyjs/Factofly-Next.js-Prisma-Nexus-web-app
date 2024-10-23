/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

type TableRowActionsProps = {};

export default function TableRowActions({ children }: React.PropsWithChildren<TableRowActionsProps>) {
  return (
    <div className="table-row-actions" onClick={(e) => e.stopPropagation()}>
      {children}
      <style jsx>{`
        .table-row-actions {
          min-width: 160px;
          text-align: end;
        }
      `}</style>
    </div>
  );
}
