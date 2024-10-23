import React from 'react';
import projectPackage from 'package.json';
import { useTranslation } from 'next-i18next';

function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="footer">
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col-md-12">
            <i className="mdi mdi-email-outline mr-5" />{' '}
            <a href="mailto:kontakt@factofly.com" target="_blank" rel="noreferrer">
              kontakt@factofly.com
            </a>
            <i className="uil-phone-alt mr-5" /> <a href="tel:%2B45%2071%2096%2000%2054">+45 71 96 00 54</a>
            <br />
            {t('footer.invoiceWithFactofly')}
            <br />
            <span>{`v${projectPackage.version || '1.0.0'}`}</span> - {`${new Date().getFullYear()}`}© Factofly
            - {t('footer.madeWithLove')}
          </div>
        </div>
      </div>
      <style jsx>{`
        .footer {
          margin-top: auto;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
