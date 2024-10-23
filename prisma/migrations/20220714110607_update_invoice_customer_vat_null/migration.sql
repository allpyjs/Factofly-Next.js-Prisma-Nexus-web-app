-- AlterTable
ALTER TABLE "invoice" ALTER COLUMN "customer_vat_id" DROP NOT NULL,
ALTER COLUMN "customer_vat_id" SET DATA TYPE VARCHAR(50);
