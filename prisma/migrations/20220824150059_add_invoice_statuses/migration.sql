/*
  Warnings:

  - Changed the type of `status` on the `invoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'SENT', 'PENDING', 'MORE_INFO_NEEDED', 'DENIED', 'APPROVED', 'SENT_TO_COMPANY', 'SENT_TO_COMPANY_NEEDS_CONTRACT', 'SENT_TO_COMPANY_CONTRACT_MADE', 'SENT_TO_COMPANY_AWAITING_APPROVAL', 'APPROVED_BY_COMPANY', 'LATE_PAYMENT', 'DEBT_COLLECTION', 'COMPANY_DISPUTE', 'PAID', 'PAYMENT_RECEIVED', 'PAYMENT_ON_HOLD', 'CANCELLED', 'DENIED_BY_COMPANY', 'SALARY_PAID', 'SALARY_PAID_CUSTOMER_PAID', 'SALARY_PAID_CUSTOMER_NOT_PAID');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('DRAFT', 'SENT', 'PENDING', 'MORE_INFO_NEEDED', 'DENIED', 'APPROVED');

-- AlterTable
ALTER TABLE "invoice" add COLUMN "invoice_status" "InvoiceStatus" not null default('DRAFT');
update "invoice" set invoice_status = cast(status as varchar)::"InvoiceStatus" where id > 0;
ALTER TABLE "invoice" drop COLUMN "status";
ALTER TABLE "invoice" RENAME COLUMN "invoice_status" to "status";

-- AlterTable
ALTER TABLE "task" add COLUMN "task_status" "TaskStatus" not null default('DRAFT');
update "task" set task_status = case when status = 'CANCELLED' then 'DENIED' else cast(status as varchar) END::"TaskStatus" where id > 0;
ALTER TABLE "task" drop COLUMN "status";
ALTER TABLE "task" RENAME COLUMN "task_status" to "status";

-- DropEnum
DROP TYPE "Status";
