-- AlterTable
ALTER TABLE "cooperation_agreement" ALTER COLUMN "extra_work_notification_other" DROP NOT NULL,
ALTER COLUMN "special_conditions" DROP NOT NULL,
ALTER COLUMN "payment_term_other" DROP NOT NULL,
ALTER COLUMN "payment_term_special" DROP NOT NULL,
ALTER COLUMN "equipment_details" DROP NOT NULL;
