/*
  Warnings:

  - Added the required column `description` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentAmount` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentType` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TaskPaymentType" AS ENUM ('PER_HOUR', 'PROJECT_PRICE');

-- AlterTable
ALTER TABLE "task" ADD COLUMN     "description" VARCHAR(255) NULL,
ADD COLUMN     "payment_amount" DECIMAL(65,30) NULL,
ADD COLUMN     "payment_type" "TaskPaymentType" NULL;
