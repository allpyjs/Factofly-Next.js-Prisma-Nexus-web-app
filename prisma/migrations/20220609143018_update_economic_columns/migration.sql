/*
  Warnings:

  - The `e_conomic_customer_id` column on the `customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `e_conomic_invoice_id` column on the `invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `e_conomic_customer_group_id` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "customer" DROP COLUMN "e_conomic_customer_id",
ADD COLUMN     "e_conomic_customer_id" BIGINT;

-- AlterTable
ALTER TABLE "invoice" DROP COLUMN "e_conomic_invoice_id",
ADD COLUMN     "e_conomic_invoice_id" BIGINT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "e_conomic_customer_group_id",
ADD COLUMN     "e_conomic_customer_group_id" BIGINT;
