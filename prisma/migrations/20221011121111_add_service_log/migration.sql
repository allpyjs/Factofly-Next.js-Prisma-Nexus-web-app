-- CreateTable
CREATE TABLE "ServiceLog" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" VARCHAR(40) NOT NULL,
    "service" VARCHAR(50) NOT NULL,
    "record_id" BIGINT NOT NULL,
    "record_type" "RecordType" NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "status" VARCHAR(50) NOT NULL,

    CONSTRAINT "ServiceLog_pkey" PRIMARY KEY ("id")
);
