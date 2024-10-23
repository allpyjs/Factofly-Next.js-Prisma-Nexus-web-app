import React from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import SidebarNav from './SidebarNav';
import Logo from '~/features/shared/components/Logo';

type SidebarProps = {
  open: boolean;
};

function Sidebar({ open }: SidebarProps): JSX.Element {
  return (
    <CSSTransition in={open} classNames="sidebar" timeout={500}>
      <div className={classNames('leftside-menu d-print-none', { open })}>
        <div className="logo-container">
          <Logo width="100%" height="70px" />
        </div>

        <div className="leftside-menu-container">
          <SidebarNav />
        </div>

        <style jsx>{`
          @media (max-width: 767.98px) {
            .leftside-menu {
              border-right: 1px solid #2b4881;
              z-index: 99999 !important;
            }
            .leftside-menu.open {
              margin-top: 70px;
              padding-top: 10px;
              display: block;
            }
            .logo-container {
              display: none;
            }
          }

          :global(.sidebar-enter),
          :global(.sidebar-exit-done) {
            transform: translate(-260px);
          }
          :global(.sidebar-enter-active) {
            transform: translate(0);
            transition: transform 500ms;
          }

          :global(.sidebar-exit) {
            transform: translate(0px);
          }
          :global(.sidebar-exit-active) {
            transform: translate(-260px);
            transition: transform 500ms;
          }
        `}</style>
      </div>
    </CSSTransition>
  );
}

export default Sidebar;
