export function toDateTimeString(input: string | Date, locale?: string): string {
  const date = input instanceof Date ? input : new Date(input);
  return date?.toLocaleString(locale);
}

export function toDateString(input: string | Date, locale?: string): string {
  const date = input instanceof Date ? input : new Date(input);
  return date?.toLocaleDateString(locale);
}

export function toISODateString(input: string | Date): string {
  const date = input instanceof Date ? input : new Date(input);
  return date.toISOString().split('T')[0];
}

export function toTimeString(input: string | Date, locale?: string): string {
  const date = input instanceof Date ? input : new Date(input);
  return date?.toLocaleTimeString(locale);
}

export function addDays(input: Date, days: number) {
  const date = new Date(input.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export function toServerDate(input: Date | null | undefined) {
  if (input === null || input === undefined) return input;
  // TODO: This is a bit of a hack because the client sends 19/10/2022 00:00:00 GMT+2 which is 18/10/2022 22:00:00 UTC, thus messing up the dates
  const date = new Date(input.valueOf());
  date.setHours(date.getHours() + 6);
  return date;
}
