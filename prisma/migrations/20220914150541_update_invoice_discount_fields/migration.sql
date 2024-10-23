/*
  Warnings:

  - You are about to drop the column `discount_amount` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the column `discount_max_amount` on the `invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invoice" DROP COLUMN "discount_amount",
DROP COLUMN "discount_max_amount",
ADD COLUMN     "discount_max_value" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "discount_value" DECIMAL(65,30) NOT NULL DEFAULT 0;
