import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import CooperationAgreementDetailsQuery from './graphql/CooperationAgreementDetailsQuery.gql';
import { CooperationAgreementDetailsQuery as CooperationAgreementDetailsQueryType } from './graphql/.generated/CooperationAgreementDetailsQuery';
import PageError from '~/features/shared/components/PageError';
import TopActions from '../../../shared/components/TopActions';
import CooperationAgreementCard from './CooperationAgreementCard';
import useDeleteCooperationAgreement from '../../hooks/useDeleteCooperationAgreements';
import DeleteButton from '~/features/shared/components/DeleteButton';
import EditButton from '~/features/shared/components/EditButton';

function CooperationAgreementDetails(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const { push } = useRouter();
  const { t } = useTranslation('cooperationAgreements');

  const { deleteCooperationAgreement } = useDeleteCooperationAgreement({
    onCompleted: () => {
      push(`/cooperations`);
    }
  });

  const { loading, error, data } = useQuery<CooperationAgreementDetailsQueryType>(
    CooperationAgreementDetailsQuery,
    {
      variables: {
        where: { id }
      }
    }
  );

  if (loading) return <div className="loading" />;

  const cooperationAgreement = data?.cooperationAgreement;

  return (
    <div>
      <div className="header row">
        <TopActions>
          <EditButton href={`/cooperations/${id}/edit`} className="btn-md" />
          <DeleteButton onConfirm={() => deleteCooperationAgreement(Number(id))} />
        </TopActions>
        <h1 className="page-title">{t('headers.view')}</h1>
      </div>
      <CooperationAgreementCard cooperationAgreement={cooperationAgreement!} />
      {error && <PageError message={error.message} />}
    </div>
  );
}

export default CooperationAgreementDetails;
