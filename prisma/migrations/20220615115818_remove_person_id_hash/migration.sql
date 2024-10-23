/*
  Warnings:

  - You are about to drop the column `person_id_hash` on the `tax_info` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "tax_info_person_id_hash_key";

-- AlterTable
ALTER TABLE "tax_info" DROP COLUMN "person_id_hash";
