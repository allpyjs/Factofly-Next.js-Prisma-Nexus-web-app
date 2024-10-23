import classNames from 'classnames';
import { useCallback, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import useWindowDimensions from '../hooks/useWindowDimensions';

type SidebarSectionProps = {
  top?: number;
  icon: string;
  onOpen?: () => void;
};

export default function SidebarSection({
  children,
  icon,
  top = 100,
  onOpen = undefined
}: React.PropsWithChildren<SidebarSectionProps>) {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen((state) => !state);
    if (!open && onOpen) onOpen();
  }, [open, onOpen]);

  const { height, width } = useWindowDimensions();

  return (
    <div className="sidebar-section">
      <div className="text-end">
        <button className="btn btn-sm btn-warning d-print-none" type="button" onClick={toggleOpen}>
          <i className={`uil ${icon}`} />
        </button>
      </div>
      <div className={classNames('border mt-2 bg-white', { 'd-none': !open })}>
        <Scrollbars style={{ width: Math.min(width - 20, 600), height: height - top - 50 }}>
          {children}
        </Scrollbars>
      </div>
      <style jsx>{`
        .sidebar-section {
          position: fixed;
          top: ${top}px;
          z-index: 1000;
          right: 0;
        }
        i {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
