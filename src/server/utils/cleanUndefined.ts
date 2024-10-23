export default function cleanUndefined<T extends { [key: string]: any }>(input: T) {
  const obj = input;
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
  return obj;
}
