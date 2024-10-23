/*
  Warnings:

  - You are about to drop the column `encyrptionMethod` on the `bank_account` table. All the data in the column will be lost.
  - You are about to drop the column `encyrptionMethod` on the `tax_info` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EncryptionMethod" AS ENUM ('RAILS_V2');

-- AlterTable
ALTER TABLE "bank_account" DROP COLUMN "encyrptionMethod",
ADD COLUMN     "encryptionMethod" "EncryptionMethod" NOT NULL DEFAULT E'RAILS_V2';

-- AlterTable
ALTER TABLE "tax_info" DROP COLUMN "encyrptionMethod",
ADD COLUMN     "encryptionMethod" "EncryptionMethod" NOT NULL DEFAULT E'RAILS_V2';
