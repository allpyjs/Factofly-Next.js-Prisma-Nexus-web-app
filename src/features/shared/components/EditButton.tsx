import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

type EditButtonProps = {
  href: string;
  className?: string;
};

export default function EditButton({ href, className = 'btn-sm' }: EditButtonProps) {
  const { t } = useTranslation('common');
  return (
    <Link href={href}>
      <a className={classNames('btn btn-primary', className)}>
        <i className="uil-pen" /> {t('buttons.edit')}
      </a>
    </Link>
  );
}
