export default function cleanOrderBy<T>(orderBy: T | undefined): { [key in string]: 'asc' | 'desc' } {
  const cleanValues: { [key in string]: 'asc' | 'desc' } = {};
  if (orderBy) {
    return Object.entries(orderBy).reduce((obj: { [key in string]: 'asc' | 'desc' }, [key, val]) => {
      if (val === 'asc' || val === 'desc') {
        return {
          ...obj,
          [key]: val
        };
      }
      return obj;
    }, {});
  }
  return cleanValues;
}
