import React from 'react';
import Link from 'next/link';
import useUser from '~/contexts/User/useUser';

function Profile() {
  // const { t } = useTranslation();
  const user = useUser();

  if (user === undefined) return <div />;

  const { displayName, role, isImpersonating } = user!;

  return (
    <div className="profile">
      <Link data-bs-toggle="dropdown" href="/" role="button" aria-haspopup="false" aria-expanded="false">
        <a className="nav-link dropdown-toggle nav-user arrow-none me-0">
          <span className="account-user-avatar mr-2">
            <div className="rounded-circle">
              <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonIcon">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </span>
          <span>
            <span className="account-user-name">
              {isImpersonating ? 'Viewing as: ' : ''}
              {displayName}
            </span>
            <span className="account-position">{role}</span>
          </span>
        </a>
      </Link>
      <style jsx>{`
        span.account-user-avatar {
          left: 10px;
          top: 15px;
        }
        .account-user-avatar .rounded-circle {
          height: 40px;
          width: 40px;
          background: rgb(189, 189, 189);
          justify-content: center;
          display: flex;
          position: relative;
          align-items: center;
        }
        .account-user-avatar svg {
          fill: white;
          width: 75%;
          height: 75%;
          flex-shrink: 0;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
}

export default Profile;
