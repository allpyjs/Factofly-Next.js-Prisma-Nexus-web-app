import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useSnackbar } from 'notistack';
import CreateReferralForm from '../CreateReferralForm';
import ReferralsQuery from './graphql/ReferralsQuery.gql';
import { ReferralsQuery as ReferralsQueryType } from './graphql/.generated/ReferralsQuery';
import { ReferralStatusEnum, SortOrder } from '~/.generated/globalTypes';
import useUser from '~/contexts/User/useUser';
import clientConfig from '~/clientConfig';
import ReferralCard from './ReferralCard';
import useFeatures from '~/features/shared/hooks/useFeatures';
import formatCurrency from '~/utils/formatCurrency';

export default function Referrals() {
  const { t } = useTranslation('rewards');
  const { id: userId, referralLinkCode, availableCredits } = useUser();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const { enqueueSnackbar } = useSnackbar();
  const { getValue } = useFeatures();

  const loadMore = useCallback(() => {
    setPagination((state) => ({ ...state, pageSize: state.pageSize + 5 }));
  }, [setPagination]);

  const variables = useMemo(
    () => ({
      first: pagination.pageSize,
      skip: pagination.pageIndex * pagination.pageSize,
      where: { user: userId ? { id: { equals: userId } } : undefined },
      earned: {
        user: userId ? { id: { equals: userId } } : undefined,
        status: { equals: ReferralStatusEnum.PAID_INVOICE }
      },
      orderBy: { createdDate: SortOrder.desc }
    }),
    [pagination, userId]
  );

  const { data, loading, refetch } = useQuery<ReferralsQueryType>(ReferralsQuery, {
    variables
  });

  useEffect(() => {
    refetch(variables);
  }, [variables, refetch]);

  const referrals = useMemo(() => data?.items?.edges?.map((x) => x.node), [data]);

  const creditsEarned = data?.earned?.totalCount ?? 0;
  const creditsSpent = (data?.earned?.totalCount ?? 0) - (availableCredits ?? 0);
  const linkUrl = `${clientConfig.baseUrl}/users/sign_up?referral_id=user_${referralLinkCode}`;

  let reward: string;
  switch (getValue('reward-type')) {
    case 'FIXED_DISCOUNT':
      reward = formatCurrency(getValue('reward-value-fixed-discount'), 'da', 'dkk');
      break;
    case 'PERCENTAGE_DISCOUNT':
    default:
      reward = t('messages.percentageDiscount', {
        value: getValue('reward-value-percentage-discount'),
        max: formatCurrency(getValue('reward-value-max-discount'), 'da', 'dkk')
      });
      break;
  }

  return (
    <div>
      <h1>{t('headers.referrals')}</h1>
      <div className="card">
        <div className="card-body">
          <h2>{t('headers.rewardTitle')}</h2>
          <p>{t('headers.rewardSubtitle')}</p>
          <p className="fw-bold fst-italic">{t('headers.creditValue', { reward })}</p>
          <div className="row">
            <div className="">
              <h3>{t('headers.shareLink')}</h3>
              <div className="input-group mb-3">
                <input type="text" className="form-control" value={linkUrl} />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(linkUrl);
                    enqueueSnackbar(t('messages.copied'), { variant: 'success' });
                  }}
                >
                  {t('buttons.copy')}
                </button>
              </div>
            </div>
            <div className="">
              <h3>{t('headers.shareEmail')}</h3>
              <CreateReferralForm />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h2>{t('headers.rewardsDashboard')}</h2>
          <div className="row">
            <div className="col text-center">
              <h3>{data?.items.totalCount ?? 0}</h3> {t('labels.friendsReferred')}
            </div>
            <div className="col text-center">
              <h3>{creditsEarned}</h3> {t('labels.creditsEarned')}
            </div>
            <div className="col text-center">
              <h3>{creditsSpent}</h3> {t('labels.creditsSpent')}
            </div>
          </div>
          <div className="referrals mt-4">
            {loading && (
              <div className="table-loader progress rounded-0 mb-3">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                  style={{ width: '100%' }}
                />
              </div>
            )}
            {referrals?.length === 0 && (
              <div className="fs-3 fw-bold mb-3 text-center">{t('messages.noReferrals')}</div>
            )}
            {referrals?.map((referral) => (
              <ReferralCard referral={referral} />
            ))}
            {!!data?.items?.totalCount && data.items.totalCount > pagination.pageSize && (
              <div className="text-center">
                <button type="button" className="btn btn-light" onClick={loadMore}>
                  {t('buttons.loadMore')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
