-- AlterTable
update "cooperation_agreement" set
    start_date = start_date + interval '3 hours', end_date = end_date + interval '3 hours'
where id > 0;
ALTER TABLE "cooperation_agreement" ALTER COLUMN "start_date" SET DATA TYPE DATE,
ALTER COLUMN "end_date" SET DATA TYPE DATE;

-- AlterTable
update "exchange_rate" set
    valid_from_date = valid_from_date + interval '3 hours', valid_to_date = valid_to_date + interval '3 hours'
where id > 0;
ALTER TABLE "exchange_rate" ALTER COLUMN "valid_from_date" SET DATA TYPE DATE,
ALTER COLUMN "valid_to_date" SET DATA TYPE DATE;

-- AlterTable
update "invoice" set
    invoice_date = invoice_date + interval '3 hours', start_date = start_date + interval '3 hours',end_date = end_date + interval '3 hours', conversion_date = conversion_date + interval '3 hours'
where id > 0;
ALTER TABLE "invoice" ALTER COLUMN "end_date" SET DATA TYPE DATE,
ALTER COLUMN "invoice_date" SET DATA TYPE DATE,
ALTER COLUMN "start_date" SET DATA TYPE DATE,
ALTER COLUMN "conversion_date" SET DATA TYPE DATE;

-- AlterTable
update "salary" set
    payment_date = payment_date + interval '3 hours'
where id > 0;
ALTER TABLE "salary" ALTER COLUMN "payment_date" SET DATA TYPE DATE;

-- AlterTable
update "task" set
    start_date = start_date + interval '3 hours', end_date = end_date + interval '3 hours'
where id > 0;
ALTER TABLE "task" ALTER COLUMN "end_date" SET DATA TYPE DATE,
ALTER COLUMN "start_date" SET DATA TYPE DATE;
