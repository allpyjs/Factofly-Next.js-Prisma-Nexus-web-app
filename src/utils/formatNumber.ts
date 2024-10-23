export default function toString(number: number, locale?: string): string {
  return Number.isNaN(number) ? '' : number.toLocaleString(locale);
}
