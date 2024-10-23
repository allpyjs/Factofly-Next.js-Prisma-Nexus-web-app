const strinifyBigInt = (value: bigint) => {
  const strValue = value.toString();
  const num = Number.parseInt(strValue, 10);
  return Number.isNaN(num) ? num : strValue;
};

export default function stringify(item: any) {
  return JSON.stringify(
    item,
    (key, value) => (typeof value === 'bigint' ? strinifyBigInt(value) : value) // return everything else unchanged
  );
}
