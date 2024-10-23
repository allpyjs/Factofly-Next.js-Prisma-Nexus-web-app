-- DropForeignKey
ALTER TABLE "audit" DROP CONSTRAINT "audit_user_id_fkey";

-- AlterTable
ALTER TABLE "audit" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "audit" ADD CONSTRAINT "audit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
