type CardItemProps = {
  label: string;
  value?: JSX.Element | string | number | null | boolean;
};

export default function CardItem({ label, value }: CardItemProps) {
  let displayValue = value;
  if (typeof value === 'boolean') {
    displayValue = value ? (
      <i className="text-success uil uil-check-circle" />
    ) : (
      <i className="text-danger uil uil-times-circle" />
    );
  }
  return (
    <div className="card-item">
      <div className="label fw-bold text-muted">{label}</div> <div className="value mb-2">{displayValue}</div>
    </div>
  );
}
