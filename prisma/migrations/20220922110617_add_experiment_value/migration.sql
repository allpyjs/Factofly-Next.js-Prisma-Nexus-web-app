/*
  Warnings:

  - Added the required column `value` to the `experiment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "experiment" ADD COLUMN     "value" TEXT NOT NULL;
