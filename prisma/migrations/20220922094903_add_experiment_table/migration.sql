-- CreateTable
CREATE TABLE "experiment" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" VARCHAR(40) NOT NULL,
    "experiment_id" TEXT NOT NULL,
    "variation_id" TEXT NOT NULL,
    "feature_id" TEXT NOT NULL,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "experiment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "experiment" ADD CONSTRAINT "experiment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
