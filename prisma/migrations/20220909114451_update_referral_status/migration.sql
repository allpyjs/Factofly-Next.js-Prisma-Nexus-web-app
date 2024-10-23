/*
  Warnings:

  - You are about to drop the column `state` on the `referral` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ReferralStatus" AS ENUM ('NONE', 'SIGNED_UP', 'SENT_INVOICE');

-- AlterTable
ALTER TABLE "referral" DROP COLUMN "state",
ADD COLUMN     "status" "ReferralStatus" NOT NULL DEFAULT E'NONE';

-- DropEnum
DROP TYPE "ReferralState";
