/*
  Warnings:

  - You are about to drop the column `crypt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `person_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `person_id_hash` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `tax_card` on the `user` table. All the data in the column will be lost.
  - Added the required column `encryptionKey` to the `bank_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encyrptionMethod` to the `bank_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encryptionKey` to the `tax_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encyrptionMethod` to the `tax_info` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_person_id_hash_key";

-- AlterTable
ALTER TABLE "bank_account" ADD COLUMN     "encryptionKey" TEXT NOT NULL,
ADD COLUMN     "encyrptionMethod" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tax_info" ADD COLUMN     "encryptionKey" TEXT NOT NULL,
ADD COLUMN     "encyrptionMethod" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "crypt",
DROP COLUMN "person_id",
DROP COLUMN "person_id_hash",
DROP COLUMN "tax_card";
