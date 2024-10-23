/*
  Warnings:

  - You are about to alter the column `e_conomic_customer_id` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `e_conomic_invoice_id` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `e_conomic_customer_group_id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "e_conomic_customer_id" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "invoice" ALTER COLUMN "e_conomic_invoice_id" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "e_conomic_customer_group_id" SET DATA TYPE INTEGER;
