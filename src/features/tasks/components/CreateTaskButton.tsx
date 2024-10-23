import { useTranslation } from 'next-i18next';
import CreateButton from '~/features/shared/components/CreateButton';

type CreateTaskButtonProps = {
  inline?: boolean;
};

export default function CreateTaskButton({ inline = false }: CreateTaskButtonProps) {
  const { t } = useTranslation();
  return <CreateButton href="/tasks/new" label={t('buttons.tasks.create')} inline={inline} />;
}
