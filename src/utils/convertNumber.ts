/**
 * Converts EN and DA number formats to EN in order to be sent to the server
 * @param value value to be converted
 * @returns value in EN number format
 */
export default function convertNumber(value: any) {
  if (value === 0) return 0;
  if (!value) return null;
  return typeof value === 'number' ? value : Number(value.replace(',', '.'));
}
