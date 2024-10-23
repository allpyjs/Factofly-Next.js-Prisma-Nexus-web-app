-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('PER_HOUR', 'FIXED');

-- CreateEnum
CREATE TYPE "ExtraWorkNotification" AS ENUM ('WRITTEN_ESTIMATE', 'WRITTEN_FIXED', 'ORAL', 'OTHER');

-- CreateEnum
CREATE TYPE "PaymentTerm" AS ENUM ('CURRENT_MONTH_PLUS', 'ONGOING_WEEK_PLUS', 'TASK_END_PLUS', 'OTHER');

-- CreateTable
CREATE TABLE "cooperation_agreement" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" VARCHAR(40) NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "task_id" BIGINT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "open_ended" BOOLEAN NOT NULL,
    "termination_agreement" TEXT NOT NULL,
    "task_description" TEXT NOT NULL,
    "extra_work" BOOLEAN NOT NULL,
    "extra_work_notification" "ExtraWorkNotification" NOT NULL,
    "extra_work_notification_other" TEXT NOT NULL,
    "price_details" TEXT NOT NULL,
    "special_conditions" TEXT NOT NULL,
    "payment_type" "PaymentType" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "payment_term" "PaymentTerm" NOT NULL,
    "payment_term_other" TEXT NOT NULL,
    "payment_term_days" INTEGER NOT NULL,
    "payment_term_special" TEXT NOT NULL,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "cooperation_agreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cooperation_agreement_deliverable" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" VARCHAR(40) NOT NULL,
    "cooperation_agreement_id" BIGINT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "cooperation_agreement_deliverable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cooperation_agreement_customer_id_fk" ON "cooperation_agreement"("customer_id");

-- CreateIndex
CREATE INDEX "cooperation_agreement_task_id_fk" ON "cooperation_agreement"("task_id");

-- CreateIndex
CREATE INDEX "cooperation_agreement_user_id_fk" ON "cooperation_agreement"("user_id");

-- CreateIndex
CREATE INDEX "cooperation_agreement_deliverable_cooperation_agreement_id_fk" ON "cooperation_agreement_deliverable"("cooperation_agreement_id");

-- AddForeignKey
ALTER TABLE "cooperation_agreement" ADD CONSTRAINT "cooperation_agreement_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooperation_agreement" ADD CONSTRAINT "cooperation_agreement_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooperation_agreement" ADD CONSTRAINT "cooperation_agreement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cooperation_agreement_deliverable" ADD CONSTRAINT "cooperation_agreement_deliverable_cooperation_agreement_id_fkey" FOREIGN KEY ("cooperation_agreement_id") REFERENCES "cooperation_agreement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
