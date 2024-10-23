-- CreateTable
CREATE TABLE "deduction" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL,
    "description" TEXT,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "deduction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "deduction_user_id_fk" ON "deduction"("user_id");

-- AddForeignKey
ALTER TABLE "deduction" ADD CONSTRAINT "deduction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
