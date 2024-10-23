import Dropdown from 'react-bootstrap/Dropdown';

type TableRowMenuItemProps = {};

export default function TableRowMenuItem({ children }: React.PropsWithChildren<TableRowMenuItemProps>) {
  return <Dropdown.Item>{children}</Dropdown.Item>;
}
