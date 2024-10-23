-- CreateTable
CREATE TABLE "exchange_rate" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" VARCHAR(40) NOT NULL,
    "source_currency" VARCHAR(3) NOT NULL,
    "target_currency" VARCHAR(3) NOT NULL,
    "exchange_rate" DECIMAL(65,30) NOT NULL,
    "valid_from_date" TIMESTAMP(3) NOT NULL,
    "valid_to_date" TIMESTAMP(3),

    CONSTRAINT "exchange_rate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "index_exchange_rate_uniqueness" ON "exchange_rate"("source_currency", "target_currency", "valid_from_date");
