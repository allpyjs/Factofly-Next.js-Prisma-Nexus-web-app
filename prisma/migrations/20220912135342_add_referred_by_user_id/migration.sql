/*
  Warnings:

  - You are about to drop the column `referralLinkCode` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "referralLinkCode",
ADD COLUMN     "referral_link_code" VARCHAR(10),
ADD COLUMN     "referred_by_user_ud" BIGINT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_referred_by_user_ud_fkey" FOREIGN KEY ("referred_by_user_ud") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
