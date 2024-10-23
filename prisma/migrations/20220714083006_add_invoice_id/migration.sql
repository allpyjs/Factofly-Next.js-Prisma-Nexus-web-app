-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "visible_id" BIGINT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "next_invoice_id" BIGINT;
