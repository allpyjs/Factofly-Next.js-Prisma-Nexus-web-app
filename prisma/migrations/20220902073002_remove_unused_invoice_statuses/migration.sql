/*
  Warnings:

  - The values [MORE_INFO_NEEDED,DENIED,APPROVED] on the enum `InvoiceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InvoiceStatus_new" AS ENUM ('DRAFT', 'SENT', 'MORE_INFO_NEEDED', 'PENDING', 'SENT_TO_COMPANY', 'SENT_TO_COMPANY_NEEDS_CONTRACT', 'SENT_TO_COMPANY_CONTRACT_MADE', 'SENT_TO_COMPANY_AWAITING_APPROVAL', 'APPROVED_BY_COMPANY', 'LATE_PAYMENT', 'DEBT_COLLECTION', 'COMPANY_DISPUTE', 'PAID', 'PAYMENT_RECEIVED', 'PAYMENT_ON_HOLD', 'CANCELLED', 'DENIED_BY_COMPANY', 'SALARY_PAID', 'SALARY_PAID_CUSTOMER_PAID', 'SALARY_PAID_CUSTOMER_NOT_PAID');
ALTER TABLE "invoice" ALTER COLUMN "status" TYPE "InvoiceStatus_new" USING ("status"::text::"InvoiceStatus_new");
ALTER TYPE "InvoiceStatus" RENAME TO "InvoiceStatus_old";
ALTER TYPE "InvoiceStatus_new" RENAME TO "InvoiceStatus";
DROP TYPE "InvoiceStatus_old";
COMMIT;
