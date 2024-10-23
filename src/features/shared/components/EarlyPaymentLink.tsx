type EarlyPaymentLinkProps = {};

export default function EarlyPaymentLink({ children }: React.PropsWithChildren<EarlyPaymentLinkProps>) {
  return (
    <a target="_blank" href="http://www.factofly.com/instant-payout/" rel="noreferrer">
      {children}
    </a>
  );
}
