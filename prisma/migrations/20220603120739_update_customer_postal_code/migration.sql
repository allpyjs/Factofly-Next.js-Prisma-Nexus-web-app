/*
  Warnings:

  - You are about to drop the column `customer_zip` on the `invoice` table. All the data in the column will be lost.
  - Added the required column `customer_postal_code` to the `invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoice" DROP COLUMN "customer_zip",
ADD COLUMN     "customer_postal_code" TEXT NOT NULL;
