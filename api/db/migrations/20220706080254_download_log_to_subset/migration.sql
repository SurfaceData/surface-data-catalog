-- DropForeignKey
ALTER TABLE "DownloadLog" DROP CONSTRAINT "DownloadLog_datasetId_fkey";

-- AddForeignKey
ALTER TABLE "DownloadLog" ADD CONSTRAINT "DownloadLog_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "DatasetSubset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
