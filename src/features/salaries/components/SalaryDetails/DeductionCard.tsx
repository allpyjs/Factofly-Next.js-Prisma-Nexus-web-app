import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import useUser from '~/contexts/User/useUser';
import DeductionStatusBadge from '~/features/deductions/components/DeductionStatusBadge';
import { SalaryViewDeductionsQuery_items_edges_node as DeductionNode } from './graphql/.generated/SalaryViewDeductionsQuery';
import formatDateDistance from '~/utils/formatDateDistance';
import DeductionModal from './DeductionModal';

type DeductionCardProps = {
  deduction: DeductionNode;
  selected: boolean;
  toggleSelected: () => void;
};

function DeductionCard({ deduction, selected, toggleSelected }: DeductionCardProps): JSX.Element {
  const { language } = useUser();
  const { t } = useTranslation('common');

  const [showDeduction, setShowDeduction] = useState(false);

  const toggleDeduction = useCallback(() => setShowDeduction((show) => !show), []);
  const hideDeduction = useCallback(() => setShowDeduction(() => false), []);

  return (
    <div className={classNames('card my-0', { selected })}>
      <div className="row">
        <div className="col-2 select-button-col">
          <button
            className={classNames('btn select-deduction-button fs-4 p-0 text-center', {
              'btn-outline-light': !selected,
              'btn-dark': selected
            })}
            type="button"
            onClick={toggleSelected}
          >
            <i className={classNames('uil', { 'uil-check': selected })} />
          </button>{' '}
        </div>

        <div className="col" role="button" tabIndex={0} onKeyDown={toggleSelected} onClick={toggleSelected}>
          <div className="card-header p-1 fs-6 border-0">
            <span className="badge bg-danger me-1">{`${deduction.id}`}</span>
            <span className="fw-bold fs-4">{deduction.description}</span>
            <DeductionStatusBadge className="float-end ms-1" status={deduction?.status} />
          </div>
          <div className="card-footer p-1 border-0">
            <div className="row">
              <div className="text-muted fs-6 col">
                {t('labels.created')} {formatDateDistance(new Date(deduction.updatedDate), language!)}
              </div>
              <div className="text-muted fs-6 col text-end">
                {t('labels.updated')} {formatDateDistance(new Date(deduction.updatedDate), language!)}
              </div>
            </div>
          </div>
        </div>
        <div className="col-2">
          <button
            className="btn btn-light view-deduction-button fs-4 p-0 text-center"
            type="button"
            onClick={toggleDeduction}
          >
            <i className="uil uil-file-search-alt" />
          </button>
        </div>
      </div>
      <DeductionModal show={showDeduction} onHide={hideDeduction} deduction={deduction} />
      <style jsx>{`
        .btn i {
          margin-right: 0;
        }
        .btn.select-deduction-button {
          top: 15px;
          bottom: 15px;
          left: 20px;
          right: 5px;
          width: 40px;
          height: 40px;
          position: absolute;
        }
        .select-button-col {
          flex: 0 0 60px;
        }
        .btn.view-deduction-button {
          top: 5px;
          bottom: 5px;
          left: 5px;
          right: 15px;
          position: absolute;
        }
        .col-2,
        .col-1 {
          position: relative;
        }
      `}</style>
    </div>
  );
}

export default DeductionCard;
