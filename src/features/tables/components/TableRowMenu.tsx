/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Dropdown from 'react-bootstrap/Dropdown';

type TableRowMenuProps = {};

export default function TableRowMenu({ children }: React.PropsWithChildren<TableRowMenuProps>) {
  return (
    <div className="table-row-menu ms-1" onClick={(e) => e.stopPropagation()}>
      <Dropdown>
        <Dropdown.Toggle variant="light" size="sm">
          <i className="dripicons-dots-3 me-0" />
        </Dropdown.Toggle>
        <Dropdown.Menu>{children}</Dropdown.Menu>
      </Dropdown>
      <style jsx>{`
        .table-row-menu {
          display: inline-block;
        }
        .table-row-menu :global(.dropdown-menu),
        .table-row-menu :global(.dropdown-item) {
          padding: 0;
        }
        .table-row-menu :global(.dropdown-toggle)::after {
          display: none;
        }
        .table-row-menu :global(.btn) {
          display: inline-block;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
