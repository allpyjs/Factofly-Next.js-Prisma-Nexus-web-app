-- CreateTable
CREATE TABLE "attachment" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "record_type" VARCHAR(255) NOT NULL,
    "record_id" BIGINT NOT NULL,
    "blob_id" BIGINT NOT NULL,

    CONSTRAINT "attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachment_blob" (
    "id" BIGSERIAL NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "key" VARCHAR(255) NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "content_type" VARCHAR(255),
    "metadata" TEXT,
    "service_name" VARCHAR(255) NOT NULL,
    "byte_size" BIGINT NOT NULL,
    "checksum" VARCHAR(255),

    CONSTRAINT "attachment_blob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "index_active_storage_attachments_on_blob_id" ON "attachment"("blob_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_attachment_uniqueness" ON "attachment"("record_type", "record_id", "name", "blob_id");

-- CreateIndex
CREATE UNIQUE INDEX "index_attachment_blob_on_key" ON "attachment_blob"("key");

-- AddForeignKey
ALTER TABLE "attachment" ADD CONSTRAINT "attachment_blob_id_fkey" FOREIGN KEY ("blob_id") REFERENCES "attachment_blob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
