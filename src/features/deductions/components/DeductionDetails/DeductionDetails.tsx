import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import { useTranslation } from 'next-i18next';
import DeductionDetailsQuery from './graphql/DeductionDetailsQuery.gql';
import { DeductionDetailsQuery as DeductionDetailsQueryType } from './graphql/.generated/DeductionDetailsQuery';
import PageError from '~/features/shared/components/PageError';
import TopActions from '../../../shared/components/TopActions';
import ButtonLink from '~/features/shared/components/ButtonLink';
import DeductionCard from './DeductionCard';
import useDeleteDeduction from '../../hooks/useDeleteDeductions';
import DeleteButton from '~/features/shared/components/DeleteButton';
import ImageViewer from '~/features/shared/components/ImageViewer';

function DeductionDetails(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const { push } = useRouter();
  const { t } = useTranslation('common');

  const { deleteDeduction } = useDeleteDeduction({
    onCompleted: () => {
      push(`/deductions`);
    }
  });

  const { loading, error, data } = useQuery<DeductionDetailsQueryType>(DeductionDetailsQuery, {
    variables: {
      where: { id }
    }
  });

  if (loading) return <div className="loading" />;

  const deduction = data?.deduction;

  return (
    <div>
      <div className="header row">
        <div className="col">
          <h1 className="page-title">Deduction</h1>
        </div>
        <TopActions>
          <ButtonLink
            icon="uil-calender"
            title={t('buttons.deductions.create')}
            href={encodeURI(`/deductions/new`)}
          />
          <ButtonLink icon="uil-pen" title={t('buttons.deductions.edit')} href={`/deductions/${id}/edit`} />
          <DeleteButton onConfirm={() => deleteDeduction(Number(id))} />
        </TopActions>
      </div>
      <DeductionCard deduction={deduction!} />
      <div className="card">
        <div className="card-body">
          {deduction?.imageUrl && !deduction?.imageUrl.endsWith('.pdf') && (
            <ImageViewer src={deduction?.imageUrl} alt="deductions image" />
          )}
          {deduction?.imageUrl && deduction?.imageUrl.endsWith('.pdf') && (
            <a className="btn btn-primary" target="_blank" href={deduction?.imageUrl} rel="noreferrer">
              {t('buttons.openPDF')} <i className="dripicons-exit ms-1" />
            </a>
          )}
        </div>
      </div>

      {error && <PageError message={error.message} />}
    </div>
  );
}

export default DeductionDetails;
