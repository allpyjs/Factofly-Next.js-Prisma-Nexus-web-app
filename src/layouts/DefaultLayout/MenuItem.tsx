import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import useFeatures from '~/features/shared/hooks/useFeatures';
import { PageItem } from './PageItem';

type MenuItemProps = {
  className?: string;
  anchorClassName?: string;
  page: PageItem;
};

function MenuItem({ page, className = undefined, anchorClassName = undefined }: MenuItemProps) {
  const { t } = useTranslation('common');
  const { isEnabled } = useFeatures();

  const featureDisabled = page.featureFlag && !isEnabled(page.featureFlag);

  return (
    <li className={classNames('side-nav-item', className, { 'd-none': featureDisabled })}>
      <Link href={page.href}>
        <a className={classNames('side-nav-link', anchorClassName, page.anchorClassName)}>
          {page.icon}
          <span>{t(`menu.${page.title}`)}</span>
          <span className="float-end">{page.badge}</span>
        </a>
      </Link>
    </li>
  );
}

export default MenuItem;
