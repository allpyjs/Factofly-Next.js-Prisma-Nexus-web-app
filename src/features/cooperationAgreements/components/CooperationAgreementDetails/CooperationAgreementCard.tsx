import { useTranslation } from 'next-i18next';
import CardHeaderIcon from '~/features/shared/components/CardHeaderIcon';
import CardItem from '~/features/shared/components/CardItem';
import { toDateString } from '~/utils/formatDate';
import { CooperationAgreementDetailsQuery_cooperationAgreement as CooperationAgreementType } from './graphql/.generated/CooperationAgreementDetailsQuery';

type DetailsCardProps = {
  cooperationAgreement: CooperationAgreementType;
};

function CooperationAgreementCard({ cooperationAgreement }: DetailsCardProps): JSX.Element {
  const { t } = useTranslation('cooperationAgreements');

  return (
    <div className="card">
      <div className="card-header p-0">
        <h3 className="m-0">
          <CardHeaderIcon icon="uil-clipboard-notes" /> {cooperationAgreement.customer.name} (Created on{' '}
          {toDateString(cooperationAgreement.createdDate)})
        </h3>
      </div>
      <div className="card-body">
        <div className="row g-1">
          <div className="col">
            <CardItem label={t('labels.startDate')} value={toDateString(cooperationAgreement.startDate)} />
          </div>
          {cooperationAgreement.endDate && (
            <div className="col">
              <CardItem label={t('labels.endDate')} value={toDateString(cooperationAgreement.endDate)} />
            </div>
          )}
        </div>
        <div className="row g-1">
          <div className="col">
            <CardItem
              label={t('labels.terminationAgreement')}
              value={cooperationAgreement.terminationAgreement}
            />
            <CardItem label={t('labels.taskDescription')} value={cooperationAgreement.taskDescription} />
          </div>
        </div>
        {cooperationAgreement.equipmentSupplied && (
          <div className="row g-1">
            <div className="col">
              <CardItem label={t('labels.equipmentSupplied')} value={cooperationAgreement.equipmentDetails} />
            </div>
          </div>
        )}
        {cooperationAgreement.extraWork && (
          <div className="row g-1">
            <div className="col">
              <CardItem
                label={t('labels.extraWorkNotification')}
                value={t(`extraWorkNotifications.${cooperationAgreement.extraWorkNotification}`)}
              />
              {cooperationAgreement.extraWorkNotificationOther
                ? `: ${cooperationAgreement.extraWorkNotificationOther}`
                : ''}
            </div>
          </div>
        )}
        <div className="row g-1">
          <div className="col">
            <CardItem label={t('labels.specialConditions')} value={cooperationAgreement.specialConditions} />
          </div>
        </div>
        <div className="row g-1">
          <div className="col">
            <CardItem
              label={t('labels.paymentType')}
              value={t(`paymentTypes.${cooperationAgreement.paymentType}`)}
            />
          </div>
          <div className="col">
            <CardItem
              label={t('labels.paymentTerm')}
              value={t(`paymentTerms.${cooperationAgreement.paymentTerm}`)}
            />
          </div>
          <div className="col">
            <CardItem label={t('labels.paymentTermDays')} value={cooperationAgreement.paymentTermDays} />
          </div>
        </div>
        {cooperationAgreement.paymentTermOther && (
          <div className="row g-1">
            <div className="col">{cooperationAgreement.paymentTermOther}</div>
          </div>
        )}
        {cooperationAgreement.paymentTermSpecial && (
          <div className="row g-1">
            <div className="col">
              <CardItem
                label={t('labels.paymentTermSpecial')}
                value={cooperationAgreement.paymentTermSpecial}
              />
            </div>
          </div>
        )}
        {/*
        <div className="row g-1">
          <div className="col">
            <SelectField name="paymentTerm" label={t('labels.paymentTerm')} options={paymentTermOptions} />
          </div>
          <div className="col">
            <TextField name="paymentTermDays" type="number" label={t('labels.paymentTermDays')} />
          </div>
        </div>
        <div className="row g-1">
          <div className="col">
            {form.watch('paymentTerm') === 'OTHER' && (
              <TextField name="paymentTermOther" label={t('labels.paymentTermOther')} />
            )}
            <TextAreaField name="paymentTermSpecial" label={t('labels.paymentTermSpecial')} />
          </div>
        </div> */}
      </div>
      <style jsx>{`
        i {
          margin-right: 3px;
        }
        .card-body .label {
          font-weight: bold;
          display: inline-block;
          text-align: right;
          width: 160px;
        }
      `}</style>
    </div>
  );
}

export default CooperationAgreementCard;
