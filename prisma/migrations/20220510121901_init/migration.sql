-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('BUSINESS', 'PRIVATE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'SENT', 'PENDING', 'MORE_INFO_NEEDED', 'DENIED', 'APPROVED', 'SENT_TO_COMPANY', 'LATE_PAYMENT', 'DEBT_COLLECTION', 'COMPANY_DISPUTE', 'PAID', 'CANCELLED', 'DENIED_BY_COMPANY', 'SALARY_PAID');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'EMPLOYEE', 'ADMIN');

-- CreateTable
CREATE TABLE "address" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country_id" BIGINT NOT NULL,
    "region" TEXT,
    "user_id" BIGINT,
    "customer_id" BIGINT,
    "zip" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "type" "CustomerType" NOT NULL,
    "contact" TEXT NOT NULL,
    "vatId" TEXT,
    "ean" BIGINT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "payment_due_days" INTEGER,
    "phone_number" TEXT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "include_vat" BOOLEAN NOT NULL,
    "current_address_id" BIGINT,
    "parent_id" BIGINT,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "vacation_payment" BOOLEAN NOT NULL DEFAULT true,
    "currency" TEXT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "customer_vat_id" TEXT NOT NULL,
    "customer_ean" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_address" TEXT NOT NULL,
    "customer_city" TEXT NOT NULL,
    "customer_zip" TEXT NOT NULL,
    "customer_contact" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "customer_phone_number" TEXT NOT NULL,
    "end_date" TIMESTAMP(3),
    "hours_worked" INTEGER NOT NULL,
    "note" TEXT,
    "invoice_date" TIMESTAMP(3) NOT NULL,
    "payment_due_days" INTEGER NOT NULL,
    "reference" TEXT,
    "start_date" TIMESTAMP(3),
    "status" "Status" NOT NULL,
    "task_id" BIGINT,
    "job_type_id" BIGINT,
    "terms_accepted" BOOLEAN NOT NULL DEFAULT false,
    "user_id" BIGINT NOT NULL,
    "include_vat" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_line" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "invoice_id" BIGINT NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "index" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "discount_percentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "product_id" BIGINT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "invoice_line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "templateId" TEXT NOT NULL,
    "templateData" JSONB NOT NULL,
    "user_id" BIGINT,
    "role" "Role",

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mail" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "externalId" TEXT,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "templateId" TEXT NOT NULL,
    "templateData" JSONB NOT NULL,
    "to" TEXT NOT NULL,
    "cc" TEXT,
    "notificationId" BIGINT,

    CONSTRAINT "mail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_type" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "classification" TEXT,
    "name_en" TEXT NOT NULL,
    "name_da" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "group" BOOLEAN NOT NULL DEFAULT false,
    "parent_id" BIGINT,

    CONSTRAINT "job_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_log" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" BIGINT NOT NULL,
    "created_by_id" BIGINT NOT NULL,
    "invoice_id" BIGINT,
    "reason" TEXT,
    "seen_by_admin" BOOLEAN NOT NULL DEFAULT false,
    "seen_by_user" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL,
    "task_id" BIGINT,

    CONSTRAINT "status_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "customer_id" BIGINT NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "expected_hours" INTEGER NOT NULL,
    "job_type_id" BIGINT NOT NULL,
    "reference" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "terms_accepted" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "current_address_id" BIGINT,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone_number" TEXT,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',
    "referral" TEXT,
    "last_active" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_email_code" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "new_email" TEXT NOT NULL,
    "expire" TIMESTAMP(3) NOT NULL,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "user_email_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_action" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    "triggered" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "user_action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_settings" (
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "language" TEXT NOT NULL,
    "job_type_id" BIGINT,
    "customer_country_id" BIGINT,
    "unit" TEXT DEFAULT E'PCS.',
    "currency" TEXT DEFAULT E'DKK',
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "user_settings_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_secrets" (
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bank_account" TEXT,
    "bank_name" TEXT,
    "bank_reg" TEXT,
    "person_id" TEXT,
    "person_id_hash" TEXT,
    "crypt" TEXT NOT NULL,
    "tax_card" TEXT,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "user_secrets_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "decrypt_log" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL,
    "decrypted_by_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "decrypt_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "address_user_id_key" ON "address"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_customer_id_key" ON "address"("customer_id");

-- CreateIndex
CREATE INDEX "address_country_id_fk" ON "address"("country_id");

-- CreateIndex
CREATE INDEX "address_user_id_fk" ON "address"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "country_code_key" ON "country"("code");

-- CreateIndex
CREATE INDEX "customer_address_id_fk" ON "customer"("current_address_id");

-- CreateIndex
CREATE INDEX "customer_parent_id_fk" ON "customer"("parent_id");

-- CreateIndex
CREATE INDEX "customer_user_id_fk" ON "customer"("user_id");

-- CreateIndex
CREATE INDEX "invoice_customer_id_fk" ON "invoice"("customer_id");

-- CreateIndex
CREATE INDEX "invoice_task_id_fk" ON "invoice"("task_id");

-- CreateIndex
CREATE INDEX "invoice_user_id_fk" ON "invoice"("user_id");

-- CreateIndex
CREATE INDEX "invoice_line_invoice_id_fk" ON "invoice_line"("invoice_id");

-- CreateIndex
CREATE INDEX "invoice_line_product_id_fk" ON "invoice_line"("product_id");

-- CreateIndex
CREATE INDEX "notification_user_id_fk" ON "notification"("user_id");

-- CreateIndex
CREATE INDEX "mail_notification_id_fk" ON "mail"("notificationId");

-- CreateIndex
CREATE INDEX "product_user_id_fk" ON "product"("user_id");

-- CreateIndex
CREATE INDEX "job_type_parent_id_fk" ON "job_type"("parent_id");

-- CreateIndex
CREATE INDEX "status_log_user_id_fk" ON "status_log"("user_id");

-- CreateIndex
CREATE INDEX "status_log_created_by_id_fk" ON "status_log"("created_by_id");

-- CreateIndex
CREATE INDEX "status_log_invoice_id_fk" ON "status_log"("invoice_id");

-- CreateIndex
CREATE INDEX "status_log_task_id_fk" ON "status_log"("task_id");

-- CreateIndex
CREATE INDEX "task_customer_id_fk" ON "task"("customer_id");

-- CreateIndex
CREATE INDEX "task_user_id_fk" ON "task"("user_id");

-- CreateIndex
CREATE INDEX "task_job_type_id_fk" ON "task"("job_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_current_address_id_fk" ON "user"("current_address_id");

-- CreateIndex
CREATE INDEX "email" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_email_code_user_id_fk" ON "user_email_code"("user_id");

-- CreateIndex
CREATE INDEX "user_action_user_id_fk" ON "user_action"("user_id");

-- CreateIndex
CREATE INDEX "user_settings_job_type_id_fk" ON "user_settings"("job_type_id");

-- CreateIndex
CREATE INDEX "user_settings_country_id_fk" ON "user_settings"("customer_country_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_secrets_person_id_hash_key" ON "user_secrets"("person_id_hash");

-- CreateIndex
CREATE INDEX "decrypt_log_user_id_fk" ON "decrypt_log"("user_id");

-- CreateIndex
CREATE INDEX "decrypt_log_decrypted_by_id_fk" ON "decrypt_log"("decrypted_by_id");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_job_type_id_fkey" FOREIGN KEY ("job_type_id") REFERENCES "job_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_line" ADD CONSTRAINT "invoice_line_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_line" ADD CONSTRAINT "invoice_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mail" ADD CONSTRAINT "mail_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "notification"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_type" ADD CONSTRAINT "job_type_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "job_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_log" ADD CONSTRAINT "status_log_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_log" ADD CONSTRAINT "status_log_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_log" ADD CONSTRAINT "status_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_log" ADD CONSTRAINT "status_log_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_job_type_id_fkey" FOREIGN KEY ("job_type_id") REFERENCES "job_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_email_code" ADD CONSTRAINT "user_email_code_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_action" ADD CONSTRAINT "user_action_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_customer_country_id_fkey" FOREIGN KEY ("customer_country_id") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_job_type_id_fkey" FOREIGN KEY ("job_type_id") REFERENCES "job_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_secrets" ADD CONSTRAINT "user_secrets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "decrypt_log" ADD CONSTRAINT "decrypt_log_decrypted_by_id_fkey" FOREIGN KEY ("decrypted_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "decrypt_log" ADD CONSTRAINT "decrypt_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
