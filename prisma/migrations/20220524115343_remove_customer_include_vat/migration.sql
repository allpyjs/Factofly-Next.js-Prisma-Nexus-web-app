/*
  Warnings:

  - You are about to drop the column `include_vat` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer" DROP COLUMN "include_vat";
