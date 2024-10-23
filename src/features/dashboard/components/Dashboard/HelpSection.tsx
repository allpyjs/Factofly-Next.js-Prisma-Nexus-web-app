import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export default function HelpSection() {
  const { t } = useTranslation('common');
  return (
    <div className="alert alert-info">
      <div className="row">
        <div className="col-md">
          <h2>
            <i className="uil-building me-1" />
            {t('menu.customers')}
          </h2>
          <p>{t('messages.customerHelp')}</p>
          <div className="section-buttons text-center">
            <Link href="/customers/new">
              <a className="btn btn-primary">
                <i className="uil-plus me-1" />
                {t('buttons.customers.create')}
              </a>
            </Link>
          </div>
        </div>
        <div className="col-md border-start border-end">
          <h2>
            <i className="uil-calender me-1" /> {t('menu.tasks')}
          </h2>
          <p>{t('messages.taskHelp')}</p>
          <div className="section-buttons text-center">
            <Link href="/tasks/new">
              <a className="btn btn-primary">
                <i className="uil-plus me-1" />
                {t('buttons.tasks.create')}
              </a>
            </Link>
          </div>
        </div>
        <div className="col-md">
          <h2>
            <i className="uil-invoice me-1" /> {t('menu.invoices')}
          </h2>
          <p>{t('messages.invoiceHelp')}</p>
          <div className="section-buttons text-center">
            <Link href="/invoices/new">
              <a className="btn btn-primary">
                <i className="uil-plus me-1" /> {t('buttons.invoices.create')}
              </a>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 600px) {
          .border-start,
          .border-end {
            border: 0 !important;
            border-top: 1px solid #dee2e6 !important;
            border-bottom: 1px solid #dee2e6 !important;
          }

          .col-md {
            padding-bottom: 1rem;
          }
        }

        @media (min-width: 600px) {
          .section-buttons {
            position: absolute;
            bottom: 0.25rem;
            width: 100%;
          }

          .col-md {
            padding-bottom: 40px;
            position: relative;
          }
        }
      `}</style>
    </div>
  );
}
