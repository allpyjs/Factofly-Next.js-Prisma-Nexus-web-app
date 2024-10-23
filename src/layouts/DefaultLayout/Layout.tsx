import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import classNames from 'classnames';
import Top from './Top';
import Footer from './Footer';
import Sidebar from './Sidebar';
import ErrorBoundary from '~/features/shared/components/ErrorBoundary';
import useSidebarMenu from './useSidebarMenu';
import AccountSetupModal from '~/features/account/components/AccountSetupModal';

function Layout({ children }: InferProps<typeof Layout.propTypes>): JSX.Element {
  const { toggleMenu, isSidebarOpen } = useSidebarMenu();
  return (
    <div className="layout">
      <ErrorBoundary>
        <Sidebar open={isSidebarOpen} />
      </ErrorBoundary>
      <main className={classNames('content', { 'sidebar-open': isSidebarOpen })}>
        <ErrorBoundary>
          <Top toggleSidebar={toggleMenu} />
        </ErrorBoundary>
        <div className="container-fluid">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
        <AccountSetupModal />
        <Footer />
      </main>
      <style jsx>{`
        .content {
          padding-left: 260px;
          padding-top: 80px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        @media (max-width: 1200px) {
          .content {
            padding-left: 0;
          }
          :global(.navbar-custom) {
            left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
