import { useTranslation } from 'next-i18next';
import CountrySelectField from '~/features/forms/components/CountrySelectField';
import FormSection from '~/features/forms/components/FormSection';
import TextField from '~/features/forms/components/TextField';

type AddressFormProps = {
  isRequired: (name: string) => boolean;
};

export default function AddressForm({ isRequired }: AddressFormProps) {
  const { t } = useTranslation('users');

  return (
    <FormSection>
      <TextField name="address" label={t('labels.address')} required={isRequired('address')} />
      <div className="row g-1">
        <div className="col">
          <TextField name="city" label={t('labels.city')} required={isRequired('city')} />
        </div>
        <div className="col">
          <TextField name="postalCode" label={t('labels.postalCode')} required={isRequired('postalCode')} />
        </div>
      </div>
      <div className="row g-1">
        <div className="col">
          <CountrySelectField
            name="countryId"
            label={t('labels.country')}
            required={isRequired('countryId')}
          />
        </div>
        <div className="col" />
      </div>
    </FormSection>
  );
}
