-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "allow_early_payment" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "early_payment" BOOLEAN NOT NULL DEFAULT false;
