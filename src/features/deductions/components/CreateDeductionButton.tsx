import { useTranslation } from 'next-i18next';
import CreateButton from '~/features/shared/components/CreateButton';

type CreateDeductionButtonProps = {
  inline?: boolean;
};

export default function CreateDeductionButton({ inline = false }: CreateDeductionButtonProps) {
  const { t } = useTranslation();
  return <CreateButton href="/deductions/new" label={t('buttons.deductions.create')} inline={inline} />;
}
