/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';
import CheckboxField from '~/features/forms/components/CheckboxField';
import FormSection from '~/features/forms/components/FormSection';
import SectionHeader from '~/features/forms/components/SectionHeader';
import SelectField from '~/features/forms/components/SelectField';
import TextField from '~/features/forms/components/TextField';

export default function TaxInfoSection() {
  const [canEdit, setCanEdit] = useState(false);
  const { t } = useTranslation('users');
  const toggleCanEdit = useCallback(() => {
    setCanEdit((value) => !value);
  }, [setCanEdit]);

  const editButton = (
    <button className="btn btn-primary btn-sm float-end" type="button" onClick={() => toggleCanEdit()}>
      <i className="uil uil-edit" />
      {t('buttons.edit')}
      <style jsx>{`
        .btn {
          margin: -0.4rem;
        }
      `}</style>
    </button>
  );

  const taxCardOptions = [
    { value: 'MAIN', label: t('taxCard.MAIN') },
    { value: 'SECONDARY', label: t('taxCard.SECONDARY') }
  ];

  return (
    <FormSection>
      <SectionHeader title={t('headers.tax')} button={editButton} />
      <div className={classNames('tax-details-new', { 'd-none': !canEdit })}>
        <div className="row g-1">
          <div className="col">
            <TextField name="personIdNew" label={t('labels.personId.dk')} />
          </div>
          <div className="col">
            <SelectField
              name="taxCardNew"
              label={t('labels.taxCard')}
              options={taxCardOptions}
              tooltip={t('descriptions.taxCard')}
            />
          </div>
        </div>
      </div>
      <div className={classNames('tax-details', { 'd-none': canEdit })}>
        <div className="row g-1">
          <div className="col">
            <TextField name="personIdHidden" label={t('labels.personId.dk')} readOnly />
          </div>
          <div className="col">
            <SelectField
              name="taxCardHidden"
              label={t('labels.taxCard')}
              options={taxCardOptions}
              tooltip={t('descriptions.taxCard')}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="row g-1">
        <div className="col">
          <CheckboxField
            name="vacationPayment"
            label={t('labels.vacationPayment')}
            description={t('descriptions.vacationPayment')}
          />
        </div>
        <div className="col" />
      </div>
    </FormSection>
  );
}
