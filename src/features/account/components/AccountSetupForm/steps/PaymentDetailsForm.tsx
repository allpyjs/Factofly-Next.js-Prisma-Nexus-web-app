import BankAccountSection from './BankAccountSection';
import TaxInfoSection from './TaxInfoSection';

type PaymentDetailsFormProps = {
  isRequired: (name: string) => boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PaymentDetailsForm({ isRequired }: PaymentDetailsFormProps) {
  return (
    <>
      <TaxInfoSection />
      <BankAccountSection />
    </>
  );
}
