import { useTranslation } from 'next-i18next';
import useUser from '~/contexts/User/useUser';

export default function AvailableCreditBadge() {
  const { availableCredits } = useUser();
  const { t } = useTranslation('rewards');

  if (!availableCredits) return <span className="d-none">0</span>;

  return (
    <span className="badge badge-credits" title={t('labels.availableCredits', { credits: availableCredits })}>
      {availableCredits}
      <style jsx>{`
        .badge.badge-credits {
          background-color: #ffbc00;
          border-radius: 10px;
          width: 20px;
          height: 20px;
          display: inline-block;
          padding: 3px;
        }
      `}</style>
    </span>
  );
}
