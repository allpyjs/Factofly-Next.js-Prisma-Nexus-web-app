/*
  Warnings:

  - You are about to drop the column `includeVat` on the `deduction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "deduction" DROP COLUMN "includeVat",
ADD COLUMN     "include_vat" BOOLEAN NOT NULL DEFAULT false;
