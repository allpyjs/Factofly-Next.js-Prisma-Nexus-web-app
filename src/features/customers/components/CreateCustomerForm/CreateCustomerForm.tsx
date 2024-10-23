import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';
import TextField from '~/features/forms/components/TextField';
import SubmitButton from '~/features/forms/components/SubmitButton';
import SectionHeader from '~/features/forms/components/SectionHeader';
import FormError from '~/features/forms/components/FormError';
import useCreateCustomerForm, { CreateCustomerFormData } from './useCreateCustomerForm';
import { CustomerTypeEnum } from '~/.generated/globalTypes';
import CountrySelectField from '~/features/forms/components/CountrySelectField';
import CustomerTypeField from '../CustomerTypeField';
import AddressLookup, { AddressLookupResult } from '../AddressLookup/AddressLookup';
import FormWrapper from '~/features/forms/components/FormWrapper';
import useUser from '~/contexts/User/useUser';

function CreateCustomerForm(): JSX.Element {
  const { t } = useTranslation('customers');
  const { id: userId, displayName, isImpersonating } = useUser();

  const defaultValues: CreateCustomerFormData = {
    type: CustomerTypeEnum.BUSINESS,
    createAsUserId: isImpersonating ? userId : undefined
  };

  const { onSubmit, error, saving, form, isRequired } = useCreateCustomerForm({ defaultValues });

  const onAddressSelect = useCallback(
    (
      { name, vatId, email, address, city, postalCode, phoneNumber }: AddressLookupResult,
      setValue: Function
    ) => {
      setValue('name', name);
      setValue('vatId', vatId);
      setValue('email', email);
      setValue('phoneNumber', phoneNumber);
      setValue('address', address);
      setValue('city', city);
      setValue('postalCode', postalCode);
    },
    []
  );

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      {({ watch, setValue }: any): JSX.Element => {
        const isBusiness = watch('type') === CustomerTypeEnum.BUSINESS;
        const inDenmark = watch('country') === 60;
        return (
          <>
            {isImpersonating && (
              <div className="alert alert-warning">{t('messages.createAs', { displayName })}</div>
            )}
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <CountrySelectField
                      name="country"
                      label={t('labels.country')}
                      required={isRequired('country')}
                    />
                  </div>
                  <div className="col">
                    <CustomerTypeField />
                  </div>
                </div>
                {isBusiness && inDenmark && (
                  <AddressLookup onSelect={(result) => onAddressSelect(result, setValue)} />
                )}
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                {!isBusiness && <SectionHeader title={t('headers.contactDetails')} />}
                <TextField
                  name="name"
                  label={isBusiness ? t('labels.companyName') : t('labels.name')}
                  required={isRequired('name')}
                />
                {isBusiness && <SectionHeader title={t('headers.contactPerson')} />}
                {isBusiness && (
                  <TextField
                    name="contact"
                    label={t('labels.name')}
                    type="text"
                    required={isRequired('contact')}
                  />
                )}
                <div className="row g-1">
                  <div className="col">
                    <TextField
                      name="email"
                      label={t('labels.email')}
                      type="email"
                      required={isRequired('email')}
                    />
                  </div>
                  <div className="col">
                    <TextField
                      name="phoneNumber"
                      label={t('labels.phoneNumber')}
                      type="tel"
                      required={isRequired('phoneNumber')}
                    />
                  </div>
                </div>

                <SectionHeader title={t('headers.address')} />
                <TextField
                  name="address"
                  label={t('labels.address')}
                  description={
                    isBusiness ? t('descriptions.address.business') : t('descriptions.address.private')
                  }
                  required={isRequired('address')}
                />
                <div className="row g-1">
                  <div className="col">
                    <TextField name="city" label={t('labels.city')} required={isRequired('city')} />
                  </div>
                  <div className="col">
                    <TextField
                      name="postalCode"
                      label={t('labels.postalCode')}
                      required={isRequired('postalCode')}
                    />
                  </div>
                </div>

                <SectionHeader title={t('headers.payment')} />

                <div className="row g-1">
                  <div className="col">
                    <TextField
                      name="paymentDueDays"
                      label={t('labels.paymentDueDays')}
                      description={t('descriptions.paymentDueDays')}
                      type="number"
                      required={isRequired('paymentDueDays')}
                    />
                  </div>
                  <div className="col">
                    <TextField
                      name="vatId"
                      label={inDenmark ? t('labels.vatId.dk') : t('labels.vatId.other')}
                      type="number"
                      required={isBusiness && inDenmark}
                    />
                  </div>
                  <div className="col">
                    <TextField
                      name="ean"
                      label={t('labels.ean')}
                      description={t('descriptions.ean')}
                      type="number"
                      required={isRequired('ean')}
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer">
                {error && <FormError message={error.message} />}
                <SubmitButton title={t('buttons.create')} saving={saving} />
              </div>
            </div>
          </>
        );
      }}
    </FormWrapper>
  );
}

export default CreateCustomerForm;
