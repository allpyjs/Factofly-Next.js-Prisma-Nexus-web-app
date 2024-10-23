/*
  Warnings:

  - You are about to drop the column `allow_early_payment` on the `customer` table. All the data in the column will be lost.
  - Added the required column `company_id` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer" DROP COLUMN "allow_early_payment",
ADD COLUMN     "company_id" BIGINT NULL;

-- CreateTable
CREATE TABLE "Company" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" VARCHAR(40) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "vatId" VARCHAR(50),
    "allow_early_payment" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
