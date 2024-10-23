import { useTranslation } from 'next-i18next';
import SubmitButton from '~/features/forms/components/SubmitButton';
import useFetchPayroll from '../hooks/useFetchPayroll';

type FetchPayrollButtonProps = {
  salaryId: number;
};

export default function FetchPayrollButton({ salaryId }: FetchPayrollButtonProps): JSX.Element {
  const { t } = useTranslation('salaries');
  const { fetchPayroll, updating: sending } = useFetchPayroll();

  return (
    <SubmitButton
      icon={<i className="mdi mdi-refresh" />}
      className="ms-2"
      onClick={() => fetchPayroll(salaryId)}
      title={t('buttons.updateFromZenegy')}
      saving={sending}
    />
  );
}
