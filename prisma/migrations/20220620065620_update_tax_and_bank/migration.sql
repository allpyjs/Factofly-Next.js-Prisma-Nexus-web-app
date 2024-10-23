/*
  Warnings:

  - You are about to drop the column `bank_reg` on the `bank_account` table. All the data in the column will be lost.
  - The `tax_card` column on the `tax_info` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TaxCard" AS ENUM ('MAIN', 'SECONDARY');

-- AlterTable
ALTER TABLE "bank_account" DROP COLUMN "bank_reg",
ADD COLUMN     "bank_registration" TEXT;

-- AlterTable
ALTER TABLE "tax_info" DROP COLUMN "tax_card",
ADD COLUMN     "tax_card" "TaxCard";
