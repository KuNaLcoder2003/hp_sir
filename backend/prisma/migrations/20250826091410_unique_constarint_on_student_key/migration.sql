/*
  Warnings:

  - A unique constraint covering the columns `[student_id]` on the table `Results` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Results_test_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Results_student_id_key" ON "Results"("student_id");
