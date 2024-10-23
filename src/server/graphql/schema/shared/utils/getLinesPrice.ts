export default function getLinesPrice(lines: { unitPrice: number; quantity: number }[] | undefined): number {
  // TODO discount.
  if (lines && lines.length > 0) {
    return lines.map(({ unitPrice, quantity }) => unitPrice * quantity).reduce((acc, cur) => acc + cur);
  }
  return 0;
}
