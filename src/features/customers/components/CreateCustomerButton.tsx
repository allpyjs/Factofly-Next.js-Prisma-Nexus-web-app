import { useTranslation } from 'next-i18next';
import CreateButton from '~/features/shared/components/CreateButton';

type CreateCustomerButtonProps = {
  inline?: boolean;
};

export default function CreateCustomerButton({ inline = false }: CreateCustomerButtonProps) {
  const { t } = useTranslation();
  return <CreateButton href="/customers/new" label={t('buttons.customers.create')} inline={inline} />;
}
