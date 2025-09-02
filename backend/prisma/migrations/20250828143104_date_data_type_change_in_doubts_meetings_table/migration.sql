/*
  Warnings:

  - You are about to drop the column `day` on the `Doubts` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Doubts` table. All the data in the column will be lost.
  - Added the required column `date` to the `Doubts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doubts" DROP COLUMN "day",
DROP COLUMN "time",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
