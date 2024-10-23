-- AlterTable
ALTER TABLE "deduction" ADD COLUMN     "conversion_date" DATE,
ADD COLUMN     "conversion_rate" DOUBLE PRECISION,
ADD COLUMN     "currency" VARCHAR(10),
ADD COLUMN     "total" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "total_dkk" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "salary" ADD COLUMN     "zenegy_payroll_uid" VARCHAR(40);

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "zenegy_employee_uid" VARCHAR(40);
