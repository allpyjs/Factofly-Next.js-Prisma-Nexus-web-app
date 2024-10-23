/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormSection from '~/features/forms/components/FormSection';
import SelectField from '~/features/forms/components/SelectField';
import TextField from '~/features/forms/components/TextField';

export default function TaxInfoSection() {
  const { watch, setValue } = useFormContext();

  const hasTaxInfo = watch('hasTaxInfo') as boolean;

  const [canEdit, setCanEdit] = useState(!hasTaxInfo);
  const { t } = useTranslation('users');
  const toggleCanEdit = useCallback(() => {
    setCanEdit((value) => !value);
    setValue('hasTaxInfo', false);
  }, [setCanEdit, setValue]);

  const taxCardOptions = [
    { value: 'MAIN', label: t('taxCard.MAIN') },
    { value: 'SECONDARY', label: t('taxCard.SECONDARY') }
  ];

  return (
    <FormSection>
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
              description={t('descriptions.taxCard')}
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
            <SelectField name="taxCardHidden" label={t('labels.taxCard')} options={taxCardOptions} readOnly />
          </div>
        </div>
      </div>
      {hasTaxInfo && (
        <div className="text-end">
          <button
            type="button"
            className={classNames('btn btn-primary', { invisible: canEdit })}
            onClick={() => toggleCanEdit()}
          >
            <i className="uil uil-edit" role="button" /> Edit tax information
          </button>
        </div>
      )}
    </FormSection>
  );
}
