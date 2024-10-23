/*
  Warnings:

  - The `value` column on the `audit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updatedValue` column on the `audit` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "audit" DROP COLUMN "value",
ADD COLUMN     "value" JSONB,
DROP COLUMN "updatedValue",
ADD COLUMN     "updatedValue" JSONB;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "currency" SET DEFAULT E'DKK',
ALTER COLUMN "unit" SET DEFAULT E'PCS.';
