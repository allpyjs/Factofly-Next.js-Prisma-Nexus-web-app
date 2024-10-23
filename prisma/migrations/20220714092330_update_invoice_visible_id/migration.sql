/*
  Warnings:

  - Made the column `visible_id` on table `invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `next_invoice_id` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "invoice" ALTER COLUMN "visible_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "next_invoice_id" SET NOT NULL,
ALTER COLUMN "next_invoice_id" SET DEFAULT 0;
