/*
  Warnings:

  - Added the required column `batchId` to the `StudentSubjects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentSubjects" ADD COLUMN     "batchId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentSubjects" ADD CONSTRAINT "StudentSubjects_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
