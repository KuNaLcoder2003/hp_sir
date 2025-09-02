/*
  Warnings:

  - Added the required column `req_date` to the `Doubts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doubts" ADD COLUMN     "req_date" TIMESTAMP(3) NOT NULL;
