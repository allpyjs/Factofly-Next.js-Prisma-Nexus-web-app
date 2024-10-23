export default function toString(number: number, culture: string, currency: string): string {
  const sanitizedNumber = Number.isNaN(number) ? 0 : number;
  const { format } = new Intl.NumberFormat(culture, { style: 'currency', currency });
  return format(sanitizedNumber);
}
