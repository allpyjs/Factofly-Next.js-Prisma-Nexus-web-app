-- CreateEnum
CREATE TYPE "SalaryPaymentType" AS ENUM ('EARLY', 'ON_PAYMENT', 'TIMED', 'VALUE');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "base_rate" DECIMAL(65,30),
ADD COLUMN     "salary_payment_day" INTEGER,
ADD COLUMN     "salary_payment_type" "SalaryPaymentType",
ADD COLUMN     "salary_payment_value" INTEGER;
