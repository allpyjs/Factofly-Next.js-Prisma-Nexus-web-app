-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "fee_amount_dkk" DOUBLE PRECISION,
ADD COLUMN     "paid_amount_dkk" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "salary" ADD COLUMN     "zenegy_employee_payroll_uid" VARCHAR(40);
