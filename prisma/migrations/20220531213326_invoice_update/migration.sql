-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "send_invoice_copy_to" TEXT;

-- AlterTable
ALTER TABLE "invoice_line" ALTER COLUMN "unit" DROP NOT NULL;
