import { useTranslation } from 'next-i18next';
import formatCurrency from '~/utils/formatCurrency';
import { EditInvoiceFormData } from './EditInvoiceForm/EditInvoiceFormData';

function getDiscount(data: EditInvoiceFormData | undefined, t: any) {
  if (data && data.creditsUsed) {
    switch (data.discountType) {
      case 'FIXED':
        return formatCurrency(data.discountValue, 'da', 'dkk');
      case 'PERCENTAGE':
        return t('messages.percentageDiscount', {
          value: data.discountValue,
          max: formatCurrency(data.discountMaxValue, 'da', 'dkk')
        });
      default:
        break;
    }
  }
  return null;
}

export default function Discount({ invoice }: { invoice: EditInvoiceFormData }) {
  const { t } = useTranslation('invoices');
  const { t: tReward } = useTranslation('rewards');
  const discount = getDiscount(invoice, tReward);
  return (
    <div className="alert alert-success">
      {t('messages.discountApplied', { discount })}
      <style jsx>{`
        .alert-success {
          padding: 10px 10px 10px 10px;
          margin: 1rem -10px 1rem -10px;
        }
      `}</style>
    </div>
  );
}
