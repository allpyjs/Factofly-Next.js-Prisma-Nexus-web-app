-- AlterTable
ALTER TABLE "user" ADD COLUMN     "account_setup_complete" BOOLEAN NOT NULL DEFAULT false;

update "user" set account_setup_complete = true where id > 0
