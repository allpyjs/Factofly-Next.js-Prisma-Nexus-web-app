-- AlterTable
ALTER TABLE "salary" ADD COLUMN     "end_date" DATE,
ADD COLUMN     "gross_income" DECIMAL(65,30),
ADD COLUMN     "payment_amount" DECIMAL(65,30),
ADD COLUMN     "start_date" DATE;
