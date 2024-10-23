-- AlterEnum
ALTER TYPE "RecordType" ADD VALUE 'COMPANY';

-- DropForeignKey
ALTER TABLE "customer" DROP CONSTRAINT "customer_company_id_fkey";

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
