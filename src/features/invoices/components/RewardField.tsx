import { useTranslation } from 'next-i18next';
import useUser from '~/contexts/User/useUser';
import CheckboxField from '~/features/forms/components/CheckboxField';
import useFeatures from '~/features/shared/hooks/useFeatures';
import formatCurrency from '~/utils/formatCurrency';

export default function RewardField() {
  const { availableCredits } = useUser();
  const { t } = useTranslation('invoices');
  const { t: tRewards } = useTranslation('rewards');
  const { getValue } = useFeatures();

  if (!availableCredits) return <span className="d-none">no rewards available</span>;

  let reward: string;
  switch (getValue('reward-type')) {
    case 'FIXED_DISCOUNT':
      reward = formatCurrency(getValue('reward-value-fixed-discount'), 'da', 'dkk');
      break;
    case 'PERCENTAGE_DISCOUNT':
    default:
      reward = tRewards('messages.percentageDiscount', {
        value: getValue('reward-value-percentage-discount'),
        max: formatCurrency(getValue('reward-value-max-discount'), 'da', 'dkk')
      });
      break;
  }

  return (
    <div className="alert alert-warning">
      {t('descriptions.useCredit', { credits: availableCredits, reward })}
      <CheckboxField name="useCredit" label={t('labels.useCredit')} />
    </div>
  );
}
