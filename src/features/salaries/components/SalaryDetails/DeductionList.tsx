import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import SalaryViewDeductionsQuery from './graphql/SalaryViewDeductionsQuery.gql';
import { SalaryViewDeductionsQuery as DeductionsQueryType } from './graphql/.generated/SalaryViewDeductionsQuery';
import PageError from '~/features/shared/components/PageError';
import DeductionCard from './DeductionCard';
import { DeductionStatusEnum } from '~/.generated/globalTypes';

type DeductionListProps = {
  userId: number;
  onApproveDeductions: (ids: number[]) => void;
  onRejectDeductions: (ids: number[]) => void;
};

function DeductionList({ userId, onApproveDeductions, onRejectDeductions }: DeductionListProps): JSX.Element {
  const { t } = useTranslation('deductions');

  const [selectedDeductions, setSelectedDeductions] = useState<number[]>([]);

  const toggleDeduction = useCallback((id: number) => {
    setSelectedDeductions((items) => {
      if (items.includes(id)) {
        return [...items.filter((x) => x !== id)];
      }
      return [...items, id];
    });
  }, []);

  const { loading, error, data, refetch } = useQuery<DeductionsQueryType>(SalaryViewDeductionsQuery, {
    variables: {
      first: 50,
      orderBy: { createdDate: 'desc' },
      where: { status: { equals: DeductionStatusEnum.SENT }, user: { id: { equals: userId } } }
    }
  });

  useEffect(() => {
    setSelectedDeductions([]);
  }, [data]);

  useEffect(() => {
    refetch({
      first: 50,
      orderBy: { createdDate: 'desc' },
      where: { status: { equals: DeductionStatusEnum.SENT }, user: { id: { equals: userId } } }
    });
  }, [userId, refetch]);

  const approveSelectedDeductions = useCallback(() => {
    if (selectedDeductions && selectedDeductions.length > 0) {
      onApproveDeductions(selectedDeductions);
    }
  }, [selectedDeductions, onApproveDeductions]);

  const rejectSelectedDeductions = useCallback(() => {
    if (selectedDeductions && selectedDeductions.length > 0) {
      onRejectDeductions(selectedDeductions);
    }
  }, [selectedDeductions, onRejectDeductions]);

  if (loading) return <div className="loading" />;

  const deductions = data?.items.edges.map((x) => (
    <div className="col-xl-6 col-lg-12">
      <DeductionCard
        deduction={x.node}
        selected={selectedDeductions.includes(x.node.id)}
        toggleSelected={() => toggleDeduction(x.node.id)}
      />
    </div>
  ));

  if (deductions?.length === 0)
    return (
      <div className="no-deductions text-muted alert alert-success">{t('messages.noOpenDeductions')}</div>
    );

  return (
    <div>
      <div className="mb-2">
        <div className="actions float-end">
          <span className="me-2 text-muted">
            {t('messages.deductionsSelected', { count: selectedDeductions.length })}
          </span>
          <button
            type="button"
            className={classNames('btn ms-1', {
              'btn-success': selectedDeductions.length > 0,
              'btn-light': selectedDeductions.length === 0
            })}
            disabled={selectedDeductions.length === 0}
            onClick={approveSelectedDeductions}
          >
            <i className="uil uil-check" />
            {t('buttons.approveSelected')}
          </button>
          <button
            type="button"
            className={classNames('btn ms-1', {
              'btn-danger': selectedDeductions.length > 0,
              'btn-light': selectedDeductions.length === 0
            })}
            disabled={selectedDeductions.length === 0}
            onClick={rejectSelectedDeductions}
          >
            <i className="uil uil-times" />
            {t('buttons.rejectSelected')}
          </button>
        </div>
        <h2>{t('headers.openDeductions')}</h2>
      </div>
      <div className="deductions row g-1 w-100">{deductions}</div>
      {error && <PageError message={error.message} />}
    </div>
  );
}

export default DeductionList;
