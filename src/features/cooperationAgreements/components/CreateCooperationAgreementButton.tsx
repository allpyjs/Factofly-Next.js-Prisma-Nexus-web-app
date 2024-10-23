import { useTranslation } from 'next-i18next';
import CreateButton from '~/features/shared/components/CreateButton';

type CreateCooperationAgreementButtonProps = {
  inline?: boolean;
};

export default function CreateCooperationAgreementButton({
  inline = false
}: CreateCooperationAgreementButtonProps) {
  const { t } = useTranslation();
  return (
    <CreateButton
      href="/cooperations/new"
      label={t('buttons.cooperationAgreements.create')}
      inline={inline}
    />
  );
}
