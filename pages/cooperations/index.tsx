/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import useUser from '~/contexts/User/useUser';
import CreateCooperationAgreementButton from '~/features/cooperationAgreements/components/CreateCooperationAgreementButton';
import CooperationAgreementsTable from '~/features/cooperationAgreements/components/CooperationAgreementsTable/CooperationAgreementsTable';
import PageHead from '~/features/shared/components/PageHead';

const CooperationAgreements: NextPage = () => {
  const { id: userId } = useUser();
  const { t } = useTranslation('cooperationAgreements');
  return (
    <div>
      <PageHead namespace="cooperationAgreements" translationKey="headers.search" />
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h1>{t('headers.search')}</h1>
          </div>
          <div className="col">
            <div className="actions text-end my-2">
              <CreateCooperationAgreementButton />
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <CooperationAgreementsTable userId={userId} />
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
    ...(await serverSideTranslations(locale, ['cooperationAgreements', 'common']))
  }
});

export default CooperationAgreements;
