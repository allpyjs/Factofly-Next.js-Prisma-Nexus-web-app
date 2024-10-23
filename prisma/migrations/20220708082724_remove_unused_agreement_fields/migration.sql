/*
  Warnings:

  - You are about to drop the column `amount` on the `cooperation_agreement` table. All the data in the column will be lost.
  - You are about to drop the column `price_details` on the `cooperation_agreement` table. All the data in the column will be lost.
  - You are about to drop the column `task_id` on the `cooperation_agreement` table. All the data in the column will be lost.
  - Added the required column `equipment_details` to the `cooperation_agreement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipment_supplied` to the `cooperation_agreement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cooperation_agreement" DROP CONSTRAINT "cooperation_agreement_task_id_fkey";

-- DropIndex
DROP INDEX "cooperation_agreement_task_id_fk";

-- AlterTable
ALTER TABLE "cooperation_agreement" DROP COLUMN "amount",
DROP COLUMN "price_details",
DROP COLUMN "task_id",
ADD COLUMN     "equipment_details" TEXT NOT NULL,
ADD COLUMN     "equipment_supplied" BOOLEAN NOT NULL;
