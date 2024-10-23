/*
  Warnings:

  - You are about to drop the column `encryptionKey` on the `bank_account` table. All the data in the column will be lost.
  - You are about to drop the column `encryptionKey` on the `tax_info` table. All the data in the column will be lost.
  - You are about to drop the `decrypt_log` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "decrypt_log" DROP CONSTRAINT "decrypt_log_decrypted_by_id_fkey";

-- DropForeignKey
ALTER TABLE "decrypt_log" DROP CONSTRAINT "decrypt_log_user_id_fkey";

-- AlterTable
ALTER TABLE "bank_account" DROP COLUMN "encryptionKey";

-- AlterTable
ALTER TABLE "tax_info" DROP COLUMN "encryptionKey";

-- DropTable
DROP TABLE "decrypt_log";
