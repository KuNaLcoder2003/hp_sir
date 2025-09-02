/*
  Warnings:

  - Added the required column `week_name` to the `Week` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Week" ADD COLUMN     "week_name" VARCHAR(200) NOT NULL;
