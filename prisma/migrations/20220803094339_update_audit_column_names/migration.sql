-- DropIndex
DROP INDEX "audit_record_id_type_ik";

-- AlterTable
ALTER TABLE "audit" RENAME COLUMN "recordType" TO  "record_type";
ALTER TABLE "audit" RENAME COLUMN "updatedValue" TO  "updated_value";

-- CreateIndex
CREATE INDEX "audit_record_id_type_ik" ON "audit"("record_id", "record_type");
