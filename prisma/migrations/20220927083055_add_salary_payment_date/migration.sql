/*
  Warnings:

  - Added the required column `payment_date` to the `salary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "salary" ADD COLUMN     "payment_date" TIMESTAMP(3) NOT NULL;
