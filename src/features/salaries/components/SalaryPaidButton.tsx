import { useTranslation } from 'next-i18next';
import { SalaryStatusEnum } from '~/.generated/globalTypes';
import SubmitButton from '~/features/forms/components/SubmitButton';
import useUpdateSalary from '../hooks/useUpdateSalary';

type SalaryPaidButtonProps = {
  salaryId: number;
  disabled?: boolean;
};

export default function SalaryPaidButton({ salaryId, disabled = false }: SalaryPaidButtonProps) {
  const { updateSalary, updating: updatingSalary } = useUpdateSalary();
  const { t } = useTranslation('salaries');
  return (
    <SubmitButton
      className="ms-2"
      icon={<i className="uil uil-money-stack" />}
      title={t('buttons.salaryPaid')}
      disabled={disabled}
      onClick={() => {
        updateSalary({ id: salaryId, status: SalaryStatusEnum.PAID });
      }}
      saving={updatingSalary}
    />
  );
}
