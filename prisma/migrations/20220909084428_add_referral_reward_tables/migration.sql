-- CreateEnum
CREATE TYPE "ReferralState" AS ENUM ('NONE', 'SIGNED_UP', 'SENT_INVOICE');

-- CreateEnum
CREATE TYPE "RewardType" AS ENUM ('CREDIT');

-- CreateEnum
CREATE TYPE "RewardSource" AS ENUM ('REFERRAL');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RecordType" ADD VALUE 'REWARD';
ALTER TYPE "RecordType" ADD VALUE 'REFERRAL';

-- CreateTable
CREATE TABLE "referral" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" VARCHAR(40) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "state" "ReferralState" NOT NULL DEFAULT E'NONE',

    CONSTRAINT "referral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reward" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" VARCHAR(40) NOT NULL,
    "user_id" BIGINT NOT NULL,
    "type" "RewardType" NOT NULL,
    "value" INTEGER NOT NULL,
    "source" "RewardSource" NOT NULL,
    "source_id" BIGINT NOT NULL,

    CONSTRAINT "reward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "referral_user_id_fk" ON "referral"("user_id");

-- CreateIndex
CREATE INDEX "reward_user_id_fk" ON "reward"("user_id");

-- AddForeignKey
ALTER TABLE "referral" ADD CONSTRAINT "referral_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reward" ADD CONSTRAINT "reward_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
