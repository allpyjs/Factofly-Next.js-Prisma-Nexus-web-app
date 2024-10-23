-- CreateEnum
CREATE TYPE "SalaryStatus" AS ENUM ('DRAFT', 'PAID');

-- AlterTable
ALTER TABLE "salary" ADD COLUMN     "status" "SalaryStatus" NOT NULL DEFAULT 'DRAFT';
