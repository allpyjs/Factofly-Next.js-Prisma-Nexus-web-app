import { Trans, useTranslation } from 'next-i18next';
import CheckboxField from '~/features/forms/components/CheckboxField';
import EarlyPaymentLink from '~/features/shared/components/EarlyPaymentLink';
import useFeatures from '~/features/shared/hooks/useFeatures';

export default function EarlyPaymentField() {
  const { t } = useTranslation('invoices');
  const { getValue } = useFeatures();
  return (
    <div className="alert alert-secondary">
      <Trans
        t={t}
        i18nKey="descriptions.earlyPayment"
        values={{ amount: getValue('early-payment-fee-rate') }}
        components={{
          referenceLink: <EarlyPaymentLink />
        }}
      />
      <CheckboxField name="earlyPayment" label={t('labels.earlyPayment')} />
    </div>
  );
}
