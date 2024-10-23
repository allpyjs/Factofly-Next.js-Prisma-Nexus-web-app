import React, { Fragment, useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars-2';
import MenuItem from './MenuItem';
import { pages, admin, otherPages, ownPages, referral } from './MenuData';
import useUser from '~/contexts/User/useUser';
import useFeatures from '~/features/shared/hooks/useFeatures';
import useWindowDimensions from '~/features/shared/hooks/useWindowDimensions';

type SidebarNavChildMenuProps = {
  items: any[];
};
function SidebarNavChildMenu({ items }: SidebarNavChildMenuProps) {
  return (
    <ul className="child-menu ps-2">
      {items.map((page: any) => (
        <MenuItem page={page} key={page.href} />
      ))}
    </ul>
  );
}

function SidebarNav() {
  const { isEnabled } = useFeatures();
  const { emailVerified, isAdmin } = useUser();
  const { t } = useTranslation('common');
  const [showNavigation, setShowNavigation] = useState(false);
  const { height } = useWindowDimensions();

  const toggleNavigation = useCallback(() => setShowNavigation((state) => !state), []);

  const canViewMenu = emailVerified;
  return (
    <Scrollbars style={{ width: 260, height: height - 70 }}>
      <ul className="side-nav">
        {canViewMenu && (
          <>
            <li className="side-nav-title side-nav-item">
              {isAdmin ? (
                <div
                  className="pe-auto"
                  onClick={toggleNavigation}
                  onKeyDown={toggleNavigation}
                  role="button"
                  tabIndex={0}
                >
                  <i
                    className={classNames('uil float-end fs-5', {
                      'uil-angle-down': !showNavigation,
                      'uil-angle-up': showNavigation
                    })}
                  />
                  {t('menu.navigation')}{' '}
                </div>
              ) : (
                <>{t('menu.navigation')}</>
              )}
            </li>
            {(!isAdmin || showNavigation) && pages.map((page) => <MenuItem page={page} key={page.href} />)}
          </>
        )}
        {isAdmin && (
          <>
            <li className="side-nav-title side-nav-item">{t('menu.admin')}</li>
            {admin.map((page) => (
              <Fragment key={page.href}>
                <MenuItem page={page} />
                {page.children && <SidebarNavChildMenu items={page.children} />}
              </Fragment>
            ))}
          </>
        )}
        <li className="side-nav-title side-nav-item">{t('menu.account')}</li>
        {canViewMenu && isEnabled('feature-referral') && <MenuItem page={referral} />}
        {canViewMenu && ownPages.map((page) => <MenuItem page={page} key={page.href} />)}
        {otherPages.map((page) => (
          <MenuItem page={page} key={page.href} />
        ))}
      </ul>
      <style jsx>{`
        .side-nav :global(.child-menu.bg-dark) {
          background-color: #365ba5 !important;
        }
      `}</style>
    </Scrollbars>
  );
}

export default SidebarNav;
