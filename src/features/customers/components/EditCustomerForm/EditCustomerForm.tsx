import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import TextField from '~/features/forms/components/TextField';
import SubmitButton from '~/features/forms/components/SubmitButton';
import SectionHeader from '~/features/forms/components/SectionHeader';
import FormError from '~/features/forms/components/FormError';
import useEditCustomerForm from './useEditCustomerForm';
import { CustomerTypeEnum } from '../../../../.generated/globalTypes';
import CountrySelectField from '~/features/forms/components/CountrySelectField';
import CustomerTypeField from '../CustomerTypeField';
import FadeIn from '~/features/shared/components/FadeIn';
import FormWrapper from '~/features/forms/components/FormWrapper';
import CheckboxField from '~/features/forms/components/CheckboxField';
import useUser from '~/contexts/User/useUser';

function EditCustomerForm(): JSX.Element {
  const { t } = useTranslation('customers');
  const {
    query: { id }
  } = useRouter();
  const { isAdmin } = useUser();

  const customerId = parseInt(id! as string, 10);

  const { onSubmit, error, saving, loading, form, isRequired } = useEditCustomerForm(customerId);

  if (loading) return <div className="loading" />;

  return (
    <FadeIn>
      <>
        <h1>{form.watch('name')}</h1>
        <FormWrapper form={form} onSubmit={onSubmit}>
          {({ watch }: any): JSX.Element => {
            const isBusiness = watch('type') === CustomerTypeEnum.BUSINESS;
            const inDenmark = watch('country') === 60;
            return (
              <>
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

                    <SectionHeader title={t('address')} />
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
                    {isAdmin && watch('type') === CustomerTypeEnum.BUSINESS && watch('vatId') && (
                      <div className="row g-1">
                        <div className="col">
                          <CheckboxField
                            name="allowEarlyPayment"
                            label={t('labels.allowEarlyPayment')}
                            required={isRequired('allowEarlyPayment')}
                          />
                        </div>
                        <div className="col" />
                        <div className="col" />
                      </div>
                    )}
                  </div>
                  <div className="card-footer">
                    {error && <FormError message={error.message} />}
                    <SubmitButton title={t('buttons.update')} saving={saving} />
                  </div>
                </div>
              </>
            );
          }}
        </FormWrapper>
      </>
    </FadeIn>
  );
}

export default EditCustomerForm;
