export const toCSV = (items: any[]) => {
  const replacer = (key: any, value: any) => (value === null ? '' : value); // specify how you want to handle null values here
  const header = Object.keys(items[0]);
  return [
    header.join(','), // header row first
    ...items.map((row) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(','))
  ].join('\r\n');
};

export default toCSV;
