import { DiscountType } from '@prisma/client';

/**
 * Calculates the discount for the invoice fee. Percentages are given from 0 to 1.
 * @param total
 * @param discountType
 * @param discountValue
 * @param maxDiscount
 * @returns Percentage discount rate from 0-1
 */
export default function calculateDiscountRate(
  total: number,
  discountType: DiscountType,
  discountValue: number,
  maxDiscount: number
) {
  if (discountType === DiscountType.PERCENTAGE) {
    return Math.max(Math.min(total * (discountValue / 100), maxDiscount, total), 0) / total;
  }
  if (discountType === DiscountType.FIXED) {
    return Math.max(Math.min(discountValue, total), 0) / total;
  }

  return 0;
}
