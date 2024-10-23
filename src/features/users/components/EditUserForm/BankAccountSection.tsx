/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';
import FormSection from '~/features/forms/components/FormSection';
import SectionHeader from '~/features/forms/components/SectionHeader';
import TextField from '~/features/forms/components/TextField';

export default function BankAccountSection() {
  const [canEdit, setCanEdit] = useState(false);
  const { t } = useTranslation('users');
  const toggleCanEdit = useCallback(() => {
    setCanEdit((value) => !value);
  }, [setCanEdit]);

  const editButton = (
    <i
      className="float-end uil uil-edit"
      style={{ cursor: 'pointer' }}
      role="button"
      onClick={() => toggleCanEdit()}
    />
  );
  return (
    <FormSection>
      <SectionHeader title={t('headers.payment')} button={editButton} />
      <div className={classNames('payment-details-new', { 'd-none': !canEdit })}>
        <div className="row g-1">
          <div className="col">
            <TextField name="bankName" label={t('labels.bankName')} />
          </div>
          <div className="col" />
        </div>
        <div className="row g-1">
          <div className="col">
            <TextField name="bankRegistration" label={t('labels.bankRegistration')} />
          </div>
          <div className="col">
            <TextField name="bankAccount" label={t('labels.bankAccount')} />
          </div>
        </div>
      </div>
      <div className={classNames('payment-details', { 'd-none': canEdit })}>
        <div className="row g-1">
          <div className="col">
            <TextField name="bankNameHidden" label={t('labels.bankName')} readOnly />
          </div>
          <div className="col" />
        </div>
        <div className="row g-1">
          <div className="col">
            <TextField name="bankRegistrationHidden" label={t('labels.bankRegistration')} readOnly />
          </div>
          <div className="col">
            <TextField name="bankAccountHidden" label={t('labels.bankAccount')} readOnly />
          </div>
        </div>
      </div>
    </FormSection>
  );
}
