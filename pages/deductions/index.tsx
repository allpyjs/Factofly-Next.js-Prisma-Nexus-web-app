/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useUser from '~/contexts/User/useUser';
import CreateDeductionButton from '~/features/deductions/components/CreateDeductionButton';
import DeductionsTable from '~/features/deductions/components/DeductionsTable/DeductionsTable';
import PageHead from '~/features/shared/components/PageHead';

const Deductions: NextPage = () => {
  const { id: userId } = useUser();
  const { t } = useTranslation('deductions');
  return (
    <div>
      <PageHead namespace="deductions" translationKey="headers.search" />
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h1>{t('headers.search')}</h1>
          </div>
          <div className="col">
            <div className="actions text-end my-2">
              <CreateDeductionButton />
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <DeductionsTable userId={userId} />
        </div>
      </div>
    </div>
  );
};

type PageProps = {
  locale: string;
};

export const getStaticProps = async ({ locale }: PageProps) => ({
  props: {
    ...(await serverSideTranslations(locale, ['deductions', 'common']))
  }
});

export default Deductions;
