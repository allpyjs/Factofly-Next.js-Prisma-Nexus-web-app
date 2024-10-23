/*
  Warnings:

  - You are about to drop the column `customer_country_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `user_secrets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `locale` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_customer_country_id_fkey";

-- DropForeignKey
ALTER TABLE "user_secrets" DROP CONSTRAINT "user_secrets_user_id_fkey";

-- DropIndex
DROP INDEX "user_country_id_fk";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "customer_country_id",
ADD COLUMN     "locale" TEXT NOT NULL;

-- DropTable
DROP TABLE "user_secrets";

-- CreateTable
CREATE TABLE "bank_account" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL,
    "default" BOOLEAN NOT NULL,
    "bank_account" TEXT,
    "bank_name" TEXT,
    "bank_reg" TEXT,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "bank_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax_info" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL,
    "country_id" BIGINT NOT NULL,
    "person_id" TEXT,
    "person_id_hash" TEXT,
    "tax_card" TEXT,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "tax_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tax_info_person_id_hash_key" ON "tax_info"("person_id_hash");

-- CreateIndex
CREATE INDEX "tax_info_country_id_fk" ON "tax_info"("country_id");

-- AddForeignKey
ALTER TABLE "bank_account" ADD CONSTRAINT "bank_account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_info" ADD CONSTRAINT "tax_info_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_info" ADD CONSTRAINT "tax_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
