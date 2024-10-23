/*
  Warnings:

  - You are about to drop the column `customer_id` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `country` table. All the data in the column will be lost.
  - You are about to drop the column `current_address_id` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `classification` on the `job_type` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `job_type` table. All the data in the column will be lost.
  - You are about to drop the column `group` on the `job_type` table. All the data in the column will be lost.
  - You are about to drop the column `name_da` on the `job_type` table. All the data in the column will be lost.
  - You are about to drop the column `parent_id` on the `job_type` table. All the data in the column will be lost.
  - You are about to drop the column `current_address_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `crypt` on the `user_secrets` table. All the data in the column will be lost.
  - You are about to drop the column `person_id` on the `user_secrets` table. All the data in the column will be lost.
  - You are about to drop the column `person_id_hash` on the `user_secrets` table. All the data in the column will be lost.
  - You are about to drop the column `tax_card` on the `user_secrets` table. All the data in the column will be lost.
  - You are about to drop the `user_settings` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[person_id_hash]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postalCode` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_dk` to the `country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_en` to the `country` table without a default value. This is not possible if the table is not empty.
  - Made the column `customer_vat_id` on table `invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customer_ean` on table `invoice` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name_dk` to the `job_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crypt` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `user_secrets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `default` to the `user_secrets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('DK', 'EN');

-- AlterEnum
ALTER TYPE "DeductionStatus" ADD VALUE 'DRAFT';

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_user_id_fkey";

-- DropForeignKey
ALTER TABLE "customer" DROP CONSTRAINT "customer_current_address_id_fkey";

-- DropForeignKey
ALTER TABLE "job_type" DROP CONSTRAINT "job_type_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_current_address_id_fkey";

-- DropForeignKey
ALTER TABLE "user_settings" DROP CONSTRAINT "user_settings_customer_country_id_fkey";

-- DropForeignKey
ALTER TABLE "user_settings" DROP CONSTRAINT "user_settings_job_type_id_fkey";

-- DropForeignKey
ALTER TABLE "user_settings" DROP CONSTRAINT "user_settings_user_id_fkey";

-- DropIndex
DROP INDEX "address_user_id_fk";

-- DropIndex
DROP INDEX "customer_address_id_fk";

-- DropIndex
DROP INDEX "job_type_parent_id_fk";

-- DropIndex
DROP INDEX "user_current_address_id_fk";

-- DropIndex
DROP INDEX "user_secrets_person_id_hash_key";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "customer_id",
DROP COLUMN "user_id",
DROP COLUMN "zip",
ADD COLUMN     "default" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "postalCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "country" DROP COLUMN "name",
ADD COLUMN     "name_dk" TEXT NOT NULL,
ADD COLUMN     "name_en" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "customer" DROP COLUMN "current_address_id";

-- AlterTable
ALTER TABLE "invoice" ALTER COLUMN "customer_vat_id" SET NOT NULL,
ALTER COLUMN "customer_ean" SET NOT NULL;

-- AlterTable
ALTER TABLE "job_type" DROP COLUMN "classification",
DROP COLUMN "description",
DROP COLUMN "group",
DROP COLUMN "name_da",
DROP COLUMN "parent_id",
ADD COLUMN     "name_dk" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "current_address_id",
ADD COLUMN     "crypt" TEXT NOT NULL,
ADD COLUMN     "currency" TEXT DEFAULT E'DKK',
ADD COLUMN     "customer_country_id" BIGINT,
ADD COLUMN     "job_type_id" BIGINT,
ADD COLUMN     "language" "Language" NOT NULL,
ADD COLUMN     "person_id" TEXT,
ADD COLUMN     "person_id_hash" TEXT,
ADD COLUMN     "tax_card" TEXT,
ADD COLUMN     "unit" TEXT DEFAULT E'PCS.';

-- AlterTable
ALTER TABLE "user_secrets" DROP COLUMN "crypt",
DROP COLUMN "person_id",
DROP COLUMN "person_id_hash",
DROP COLUMN "tax_card",
ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "default" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "user_settings";

-- CreateTable
CREATE TABLE "_AddressToCustomer" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE "_AddressToUser" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToCustomer_AB_unique" ON "_AddressToCustomer"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToCustomer_B_index" ON "_AddressToCustomer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToUser_AB_unique" ON "_AddressToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToUser_B_index" ON "_AddressToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "user_person_id_hash_key" ON "user"("person_id_hash");

-- CreateIndex
CREATE INDEX "user_job_type_id_fk" ON "user"("job_type_id");

-- CreateIndex
CREATE INDEX "user_country_id_fk" ON "user"("customer_country_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_customer_country_id_fkey" FOREIGN KEY ("customer_country_id") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_job_type_id_fkey" FOREIGN KEY ("job_type_id") REFERENCES "job_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToCustomer" ADD CONSTRAINT "_AddressToCustomer_A_fkey" FOREIGN KEY ("A") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToCustomer" ADD CONSTRAINT "_AddressToCustomer_B_fkey" FOREIGN KEY ("B") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToUser" ADD CONSTRAINT "_AddressToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToUser" ADD CONSTRAINT "_AddressToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
