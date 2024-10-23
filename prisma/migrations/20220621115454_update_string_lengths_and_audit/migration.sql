/*
  Warnings:

  - You are about to alter the column `address` on the `address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `city` on the `address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `region` on the `address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `uuid` on the `address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `postalCode` on the `address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `bank_account` on the `bank_account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `bank_name` on the `bank_account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `bank_registration` on the `bank_account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `code` on the `country` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `uuid` on the `country` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `name_en` on the `country` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name_da` on the `country` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `contact` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `vatId` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `email` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `phone_number` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `uuid` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `description` on the `deduction` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `uuid` on the `deduction` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `currency` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `customer_vat_id` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `customer_ean` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `customer_name` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `customer_address` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `customer_city` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `customer_contact` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `customer_email` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `customer_phone_number` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `reference` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `uuid` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `send_invoice_copy_to` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `customer_postal_code` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `description` on the `invoice_line` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `unit` on the `invoice_line` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `uuid` on the `invoice_line` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `name_en` on the `job_type` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `uuid` on the `job_type` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `name_da` on the `job_type` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `externalId` on the `mail` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `templateId` on the `mail` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `to` on the `mail` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `cc` on the `mail` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `templateId` on the `notification` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `description` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `unit` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `uuid` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `reference` on the `task` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `title` on the `task` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `uuid` on the `task` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `person_id` on the `tax_info` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `first_name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `last_name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `phone_number` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `referral` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `uuid` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `currency` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `unit` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `locale` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `action` on the `user_action` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `uuid` on the `user_action` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `code` on the `user_email_code` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `new_email` on the `user_email_code` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `uuid` on the `user_email_code` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to drop the `status_log` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('TASK', 'INVOICE', 'USER', 'DEDUCTION', 'CUSTOMER');

-- DropForeignKey
ALTER TABLE "status_log" DROP CONSTRAINT "status_log_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "status_log" DROP CONSTRAINT "status_log_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "status_log" DROP CONSTRAINT "status_log_task_id_fkey";

-- DropForeignKey
ALTER TABLE "status_log" DROP CONSTRAINT "status_log_user_id_fkey";

-- AlterTable
ALTER TABLE "address" ALTER COLUMN "address" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "city" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "region" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "uuid" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "postalCode" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "bank_account" ALTER COLUMN "bank_account" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "bank_name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "bank_registration" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "country" ALTER COLUMN "code" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "uuid" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "name_en" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "name_da" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "contact" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "vatId" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "phone_number" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "uuid" SET DATA TYPE VARCHAR(40);

-- AlterTable
ALTER TABLE "deduction" ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "uuid" SET DATA TYPE VARCHAR(40);

-- AlterTable
ALTER TABLE "invoice" ALTER COLUMN "currency" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "customer_vat_id" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "customer_ean" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "customer_name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "customer_address" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "customer_city" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "customer_contact" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "customer_email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "customer_phone_number" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "reference" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "uuid" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "send_invoice_copy_to" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "customer_postal_code" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "invoice_line" ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "unit" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "uuid" SET DATA TYPE VARCHAR(40);

-- AlterTable
ALTER TABLE "job_type" ALTER COLUMN "name_en" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "uuid" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "name_da" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "mail" ALTER COLUMN "externalId" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "templateId" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "to" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "cc" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "notification" ALTER COLUMN "templateId" SET DATA TYPE VARCHAR(10);

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "unit" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "uuid" SET DATA TYPE VARCHAR(40);

-- AlterTable
ALTER TABLE "task" ALTER COLUMN "reference" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "uuid" SET DATA TYPE VARCHAR(40);

-- AlterTable
ALTER TABLE "tax_info" ALTER COLUMN "person_id" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "first_name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "last_name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "phone_number" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "referral" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "uuid" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "currency" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "unit" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "locale" SET DATA TYPE VARCHAR(10);

-- AlterTable
ALTER TABLE "user_action" ALTER COLUMN "action" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "uuid" SET DATA TYPE VARCHAR(40);

-- AlterTable
ALTER TABLE "user_email_code" ALTER COLUMN "code" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "new_email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "uuid" SET DATA TYPE VARCHAR(40);

-- DropTable
DROP TABLE "status_log";

-- CreateTable
CREATE TABLE "audit" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" VARCHAR(40) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "record_id" BIGINT NOT NULL,
    "recordType" "RecordType" NOT NULL,
    "event" VARCHAR(255) NOT NULL,
    "value" TEXT,
    "updatedValue" TEXT,

    CONSTRAINT "audit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "audit_user_id_fk" ON "audit"("user_id");

-- CreateIndex
CREATE INDEX "audit_record_id_type_ik" ON "audit"("record_id", "recordType");

-- AddForeignKey
ALTER TABLE "audit" ADD CONSTRAINT "audit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
