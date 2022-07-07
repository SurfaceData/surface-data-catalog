-- AlterTable
ALTER TABLE "Dataset" ADD COLUMN     "expirationInDays" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "DatasetAccess" ADD COLUMN     "expiration" TIMESTAMP(3);
