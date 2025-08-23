-- DropForeignKey
ALTER TABLE "StudentSubjects" DROP CONSTRAINT "StudentSubjects_batchId_fkey";

-- DropForeignKey
ALTER TABLE "StudentSubjects" DROP CONSTRAINT "StudentSubjects_studentEmail_fkey";

-- AddForeignKey
ALTER TABLE "StudentSubjects" ADD CONSTRAINT "StudentSubjects_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSubjects" ADD CONSTRAINT "StudentSubjects_studentEmail_fkey" FOREIGN KEY ("studentEmail") REFERENCES "Student"("email") ON DELETE CASCADE ON UPDATE CASCADE;
