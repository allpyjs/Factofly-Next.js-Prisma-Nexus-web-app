import convertNumber from './convertNumber';

/**
 * Transforms numbers used in validation
 * @param input Number input if available
 * @param value String input of number if not already transformed
 * @returns Number in correct format
 */
export default function transformNumber(input: any, value: any) {
  if (Number.isNaN(input) && value === '') return null;
  if (Number.isNaN(input) && value) return convertNumber(value);
  return input;
}
