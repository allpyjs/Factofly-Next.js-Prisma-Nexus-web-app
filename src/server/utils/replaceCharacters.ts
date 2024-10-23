export default function replaceCharacters(str: string, symbol: string, start: number, end: number) {
  const array = Array.from(str);
  array.fill(symbol, start, end);
  return array.join('');
}
