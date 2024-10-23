import { useTranslation } from 'next-i18next';
import { CustomerTypeEnum } from '../../../.generated/globalTypes';
import RadioBoxField, { RadioBoxFieldOption } from '~/features/forms/components/RadioBoxField';

function CustomerTypeField() {
  const { t } = useTranslation('customers');
  const customerTypes: RadioBoxFieldOption[] = [
    { value: CustomerTypeEnum.BUSINESS, label: t('labels.types.business') },
    { value: CustomerTypeEnum.PRIVATE, label: t('labels.types.private') }
  ];
  return <RadioBoxField name="type" label={t('labels.type')} options={customerTypes} />;
}

export default CustomerTypeField;
