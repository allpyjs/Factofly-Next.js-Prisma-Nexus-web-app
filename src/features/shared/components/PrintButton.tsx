import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

type PrintButtonProps = {
  className?: string;
};

function PrintButton({ className = undefined }: PrintButtonProps) {
  const { t } = useTranslation('common');
  return (
    <button type="button" className={classNames('btn btn-primary', className)} onClick={() => window.print()}>
      <i className="uil uil-print" /> {t('buttons.print')}
    </button>
  );
}

export default PrintButton;
