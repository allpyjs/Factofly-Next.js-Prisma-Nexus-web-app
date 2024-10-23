import { useTranslation } from 'next-i18next';
import CardHeaderIcon from '~/features/shared/components/CardHeaderIcon';
import CardItem from '~/features/shared/components/CardItem';
import { DeductionDetailsQuery_deduction as DeductionType } from './graphql/.generated/DeductionDetailsQuery';

type DetailsCardProps = {
  deduction: DeductionType;
};

function DeductionCard({ deduction }: DetailsCardProps): JSX.Element {
  const { t } = useTranslation('deductions');

  return (
    <div className="card">
      <div className="card-header p-0">
        <h3 className="m-0">
          <CardHeaderIcon icon="uil-clipboard-notes" /> {deduction.description}
        </h3>
      </div>
      <div className="card-body">
        <CardItem label={t('labels.total')} value={deduction.total} />
        <CardItem label={t('labels.includeVat')} value={deduction.includeVat} />
      </div>
      <style jsx>{`
        i {
          margin-right: 3px;
        }
      `}</style>
    </div>
  );
}

export default DeductionCard;
