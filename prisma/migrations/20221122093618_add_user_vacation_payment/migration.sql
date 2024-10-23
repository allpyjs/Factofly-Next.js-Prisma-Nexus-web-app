/*
  Warnings:

  - You are about to drop the column `postalCode` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `encryptionMethod` on the `bank_account` table. All the data in the column will be lost.
  - You are about to drop the column `vatId` on the `company` table. All the data in the column will be lost.
  - Added the required column `postal_code` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address"  RENAME COLUMN  "postalCode" TO "postal_code";

-- AlterTable
ALTER TABLE "bank_account"  RENAME COLUMN  "encryptionMethod" TO "encryption_method";

-- AlterTable
ALTER TABLE "company" RENAME COLUMN "vatId" to "vat_id";

-- AlterTable
ALTER TABLE "user" ADD COLUMN "vacation_payment" BOOLEAN NOT NULL DEFAULT true;
