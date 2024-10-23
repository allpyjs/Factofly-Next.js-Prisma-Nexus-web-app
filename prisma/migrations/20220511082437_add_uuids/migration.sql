/*
  Warnings:

  - The required column `uuid` was added to the `address` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `attachment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `attachment_blob` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `country` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `customer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `decrypt_log` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `deduction` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `invoice` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `invoice_line` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `job_type` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `mail` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `notification` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `status_log` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `task` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `user` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `user_action` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `user_email_code` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "address" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "attachment" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "attachment_blob" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "country" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "decrypt_log" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "deduction" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "invoice_line" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "job_type" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "mail" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "status_log" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "task" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_action" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_email_code" ADD COLUMN     "uuid" TEXT NOT NULL;
