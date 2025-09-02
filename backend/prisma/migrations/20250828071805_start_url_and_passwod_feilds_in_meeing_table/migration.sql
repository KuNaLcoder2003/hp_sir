/*
  Warnings:

  - Added the required column `meeting_password` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_url` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meeting" ADD COLUMN     "meeting_password" TEXT NOT NULL,
ADD COLUMN     "start_url" TEXT NOT NULL;
