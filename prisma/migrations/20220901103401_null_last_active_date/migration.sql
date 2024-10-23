-- AlterTable
ALTER TABLE "invoice" ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "task" ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "last_active" DROP NOT NULL,
ALTER COLUMN "last_active" DROP DEFAULT;
