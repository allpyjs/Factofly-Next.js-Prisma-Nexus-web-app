/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Referrals from '~/features/rewards/components/Referrals/Referrals';
import PageHead from '~/features/shared/components/PageHead';

const ReferralsPage: NextPage = () => (
  <div className="container-sm">
    <PageHead namespace="common" translationKey="menu.settings" />
    <Referrals />
  </div>
);

type PageProps = {
  locale: string;
};

export const getStaticProps = async ({ locale }: PageProps) => ({
  props: {
    ...(await serverSideTranslations(locale, ['users', 'common', 'rewards']))
  }
});

export default ReferralsPage;
