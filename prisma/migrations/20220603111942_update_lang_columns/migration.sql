/*
  Warnings:

  - You are about to drop the column `name_dk` on the `country` table. All the data in the column will be lost.
  - You are about to drop the column `name_dk` on the `job_type` table. All the data in the column will be lost.
  - Added the required column `name_da` to the `country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_da` to the `job_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "country" DROP COLUMN "name_dk",
ADD COLUMN     "name_da" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "job_type" DROP COLUMN "name_dk",
ADD COLUMN     "name_da" TEXT NOT NULL;
