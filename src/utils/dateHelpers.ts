export function subtractWeeks(numOfWeeks: number, date = new Date()) {
  date.setDate(date.getDate() - numOfWeeks * 7);

  return date;
}

export function dateOnly(dateTime: Date) {
  const dateStr = dateTime.toDateString();
  const dateWithTimezone = new Date(dateStr);
  const timeZone = dateWithTimezone.getTimezoneOffset() * 60000;
  return new Date(dateWithTimezone.getTime() - timeZone);
}

export function firstOfMonth(dateTime: Date = new Date()) {
  const result = dateTime;
  result.setDate(1);
  return dateOnly(result);
}

export default {
  subtractWeeks
};
