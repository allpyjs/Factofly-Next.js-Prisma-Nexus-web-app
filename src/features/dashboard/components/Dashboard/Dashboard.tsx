import { useQuery } from '@apollo/client';
import ContentLoader from 'react-content-loader';
import { useTranslation } from 'next-i18next';
import DashboardCard from '../DashboardCard';

import DashboardQuery from './graphql/DashboardQuery.gql';
import { DashboardQuery as DashboardQueryType } from './graphql/.generated/DashboardQuery';
import HelpSection from './HelpSection';
// import LoadingComponent from '~/features/shared/components/LoadingComponent';

export default function Dashboard() {
  const { data, loading, error } = useQuery<DashboardQueryType>(DashboardQuery);
  const { t } = useTranslation('invoices');
  if (loading) {
    return (
      <div className="row">
        <div className="col">
          <ContentLoader speed={2} width="100%" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
            <rect width="100%" height="100" />
          </ContentLoader>
        </div>
        <div className="col">
          <ContentLoader speed={2} width="100%" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
            <rect width="100%" height="100" />
          </ContentLoader>
        </div>
        <div className="col">
          <ContentLoader speed={2} width="100%" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
            <rect width="100%" height="100" />
          </ContentLoader>
        </div>
        <div className="col">
          <ContentLoader speed={2} width="100%" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
            <rect width="100%" height="100" />
          </ContentLoader>
        </div>
      </div>
    );
  }

  return (
    <>
      {error && <div className="alert alert-danger">There was an error loading the dashboard</div>}
      <HelpSection />
      <div className="row">
        <div className="col">
          {data?.dashboard?.draft && (
            <DashboardCard
              title={t('statuses.DRAFT')}
              badgeClassName="bg-secondary"
              count={data.dashboard.draft.count}
              amount={data.dashboard.draft.amount}
            />
          )}
        </div>
        <div className="col">
          {data?.dashboard?.open && (
            <DashboardCard
              title={t('statuses.OPEN')}
              badgeClassName="bg-primary"
              count={data.dashboard.open.count}
              amount={data.dashboard.open.amount}
            />
          )}
        </div>
        <div className="col">
          {data?.dashboard?.paidOut && (
            <DashboardCard
              title={t('statuses.PAID_OUT')}
              badgeClassName="bg-success"
              count={data.dashboard.paidOut.count}
              amount={data.dashboard.paidOut.amount}
            />
          )}
        </div>
        <div className="col">
          {data?.dashboard?.expired && (
            <DashboardCard
              title={t('statuses.EXPIRED')}
              badgeClassName="bg-danger"
              count={data.dashboard.expired.count}
              amount={data.dashboard.expired.amount}
            />
          )}
        </div>
      </div>
    </>
  );
}
