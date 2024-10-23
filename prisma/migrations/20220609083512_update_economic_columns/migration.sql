/*
  Warnings:

  - You are about to drop the column `e_conomic_group_id` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "e_conomic_group_id",
ADD COLUMN     "e_conomic_customer_group_id" TEXT;
