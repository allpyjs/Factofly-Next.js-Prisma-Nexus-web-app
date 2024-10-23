/*
  Warnings:

  - You are about to drop the column `referred_by_user_ud` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_referred_by_user_ud_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "referred_by_user_ud",
ADD COLUMN     "referred_by_user_id" BIGINT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_referred_by_user_id_fkey" FOREIGN KEY ("referred_by_user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
