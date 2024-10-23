import { useTranslation } from 'next-i18next';

export default function DownloadPayslipButton({ url }: { url: string }) {
  const { t } = useTranslation('salaries');
  return (
    <a className="btn btn-primary me-2" target="_blank" href={url} rel="noreferrer">
      {t('buttons.downloadPayslip')} <i className="dripicons-exit ms-1" />
    </a>
  );
}
