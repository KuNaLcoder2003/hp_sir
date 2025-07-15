-- CreateTable
CREATE TABLE "StudentSubjects" (
    "subjectId" INTEGER NOT NULL,
    "studentEmail" TEXT NOT NULL,

    CONSTRAINT "StudentSubjects_pkey" PRIMARY KEY ("studentEmail","subjectId")
);

-- AddForeignKey
ALTER TABLE "StudentSubjects" ADD CONSTRAINT "StudentSubjects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSubjects" ADD CONSTRAINT "StudentSubjects_studentEmail_fkey" FOREIGN KEY ("studentEmail") REFERENCES "Student"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
