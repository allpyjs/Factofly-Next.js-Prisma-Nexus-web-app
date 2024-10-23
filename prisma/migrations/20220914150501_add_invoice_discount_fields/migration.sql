-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('NONE', 'FIXED', 'PERCENTAGE');

-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "credits_used" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "discount_amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "discount_max_amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "discount_type" "DiscountType" NOT NULL DEFAULT E'NONE';
