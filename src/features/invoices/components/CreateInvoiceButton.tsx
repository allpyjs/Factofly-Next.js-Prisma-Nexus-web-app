import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export default function CreateInvoiceButton() {
  const { t } = useTranslation();
  return (
    <Link href="/invoices/new">
      <a className="btn btn-primary">
        <i className="uil-plus" />
        {t('buttons.invoices.create')}
      </a>
    </Link>
  );
}
