/*
  Warnings:

  - Added the required column `customer_country_id` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "customer_country_id" BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_customer_country_id_fkey" FOREIGN KEY ("customer_country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
