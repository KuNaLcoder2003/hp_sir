/*
  Warnings:

  - Added the required column `teacher_code` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "teacher_code" TEXT NOT NULL;
