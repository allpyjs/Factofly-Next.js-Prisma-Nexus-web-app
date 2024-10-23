/*
  Warnings:

  - Changed the type of `status` on the `deduction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DeductionStatus" AS ENUM ('SENT', 'APPROVED', 'DECLINED', 'DELETED_BY_USER');

-- AlterTable
ALTER TABLE "deduction" DROP COLUMN "status",
ADD COLUMN     "status" "DeductionStatus" NOT NULL;
