-- AlterTable
ALTER TABLE "deduction" ADD COLUMN     "salary_id" BIGINT;

-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "salary_id" BIGINT;

-- CreateTable
CREATE TABLE "salary" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" VARCHAR(40) NOT NULL,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "salary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "salary_user_id_fk" ON "salary"("user_id");

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_salary_id_fkey" FOREIGN KEY ("salary_id") REFERENCES "salary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salary" ADD CONSTRAINT "salary_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deduction" ADD CONSTRAINT "deduction_salary_id_fkey" FOREIGN KEY ("salary_id") REFERENCES "salary"("id") ON DELETE SET NULL ON UPDATE CASCADE;
