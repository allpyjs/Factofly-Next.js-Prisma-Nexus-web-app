-- AlterEnum
ALTER TYPE "RecordType" ADD VALUE 'COOPERATION_AGREEMENT';

-- AlterTable
ALTER TABLE "cooperation_agreement" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "end_date" DROP NOT NULL,
ALTER COLUMN "open_ended" SET DEFAULT false,
ALTER COLUMN "extra_work" SET DEFAULT false;
