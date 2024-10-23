/*
  Warnings:

  - Changed the type of `variation_id` on the `experiment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "experiment" DROP COLUMN "variation_id",
ADD COLUMN     "variation_id" INTEGER NOT NULL;
