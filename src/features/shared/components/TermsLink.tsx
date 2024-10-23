type TermsLinkProps = {};

export default function TermsLink({ children }: React.PropsWithChildren<TermsLinkProps>) {
  return (
    <a target="_blank" href="https://www.factofly.com/forretningsbetingelser_1/" rel="noreferrer">
      {children}
    </a>
  );
}
