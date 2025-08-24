/*
  Warnings:

  - You are about to drop the column `marks` on the `Test` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `Test` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_student_id_fkey";

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "marks",
DROP COLUMN "student_id";

-- CreateTable
CREATE TABLE "Results" (
    "id" SERIAL NOT NULL,
    "test_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "marks" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Results_id_key" ON "Results"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Results_test_id_key" ON "Results"("test_id");

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
