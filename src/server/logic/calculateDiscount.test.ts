import { describe, expect, test } from '@jest/globals';
import { DiscountType } from '@prisma/client';
import calculateDiscountRate from './calculateDiscount';

const discountData = [
  [500, DiscountType.FIXED.toString(), 500, 0, 1],
  [500, DiscountType.FIXED.toString(), 250, 0, 0.5],
  [500, DiscountType.FIXED.toString(), 100, 0, 0.2],
  [500, DiscountType.FIXED.toString(), 400, 0, 0.8],
  [500, DiscountType.FIXED.toString(), -100, 0, 0],
  [500, DiscountType.FIXED.toString(), 999999, 0, 1],
  [500, DiscountType.PERCENTAGE.toString(), 100, 500, 1],
  [500, DiscountType.PERCENTAGE.toString(), 100, 250, 0.5],
  [500, DiscountType.PERCENTAGE.toString(), 50, 500, 0.5],
  [500, DiscountType.PERCENTAGE.toString(), 30, 500, 0.3],
  [500, DiscountType.PERCENTAGE.toString(), 5000, 1000, 1],
  [500, DiscountType.PERCENTAGE.toString(), -10, 10000, 0]
];

describe('calculateDiscount', () => {
  test.each(discountData)(
    'Total: %d dkk, Discount: %s %d, MaxValue: %d dkk = %d',
    (total, type, amount, max, expected) => {
      expect(
        calculateDiscountRate(total as number, type as DiscountType, amount as number, max as number)
      ).toBe(expected);
    }
  );
});
