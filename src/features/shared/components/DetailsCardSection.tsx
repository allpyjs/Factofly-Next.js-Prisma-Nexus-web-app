import { ReactNode } from 'react';

type DetailsCardSectionProps = {
  children: ReactNode;
};

function DetailsCardSection({ children }: DetailsCardSectionProps) {
  return <div className="details-card-section">{children}</div>;
}

export default DetailsCardSection;
