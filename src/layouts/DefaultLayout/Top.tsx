import React from 'react';
import RouterLink from 'next/link';
import Logo from '~/features/shared/components/Logo';
import Profile from './Profile';
import useUser from '~/contexts/User/useUser';

type TopProps = {
  toggleSidebar: () => void;
};

function Top({ toggleSidebar }: TopProps): JSX.Element {
  const { isImpersonating, clearImpersonatedUser } = useUser();

  return (
    <div className="topbar navbar-custom">
      <span className="d-inline d-xl-none">
        <button type="button" className="btn btn-white toggle-menu m-1" onClick={toggleSidebar}>
          <i className="mdi mdi-menu" />
        </button>
        <RouterLink href="/">
          <span>
            <Logo height="50" />
          </span>
        </RouterLink>
      </span>
      <ul className="list-unstyled topbar-menu float-end mb-0">
        <li className="dropdown notification-list">
          <Profile />
        </li>
      </ul>
      {isImpersonating && clearImpersonatedUser && (
        <button
          type="button"
          className="btn btn-sm btn-danger float-end cancel-impersonation"
          onClick={() => {
            clearImpersonatedUser();
          }}
        >
          Stop Impersonating
        </button>
      )}
      <style jsx>{`
        .topbar :global(.logo) {
          display: inline-block;
          line-height: 70px;
          width: 125px;
          margin-left: -15px;
        }
        .btn.cancel-impersonation {
          margin-top: 18px;
        }
        .btn.toggle-menu:focus {
          box-shadow: none;
        }
        .btn.toggle-menu i {
          font-size: 1.5rem;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
}

export default Top;
