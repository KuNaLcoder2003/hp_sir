/*
  Warnings:

  - You are about to drop the column `req_date` on the `Doubts` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `booked` on the `Slot` table. All the data in the column will be lost.
  - You are about to drop the column `bookedBy` on the `Slot` table. All the data in the column will be lost.
  - You are about to drop the column `doubtId` on the `Slot` table. All the data in the column will be lost.
  - You are about to drop the column `weekNumber` on the `Slot` table. All the data in the column will be lost.
  - Added the required column `day` to the `Doubts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slot_id` to the `Doubts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Doubts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joinTime` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slot_id` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `week_id` to the `Slot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `week_number` to the `Slot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_doubtId_fkey";

-- AlterTable
ALTER TABLE "Doubts" DROP COLUMN "req_date",
ADD COLUMN     "day" TEXT NOT NULL,
ADD COLUMN     "slot_id" INTEGER NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Meeting" DROP COLUMN "url",
ADD COLUMN     "joinTime" TEXT NOT NULL,
ADD COLUMN     "join_url" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "slot_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "booked",
DROP COLUMN "bookedBy",
DROP COLUMN "doubtId",
DROP COLUMN "weekNumber",
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 15,
ADD COLUMN     "slot_booked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "week_id" INTEGER NOT NULL,
ADD COLUMN     "week_number" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Week" (
    "id" SERIAL NOT NULL,
    "week_no" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Week_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Week_week_no_key" ON "Week"("week_no");

-- AddForeignKey
ALTER TABLE "Doubts" ADD CONSTRAINT "Doubts_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "Slot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_week_id_fkey" FOREIGN KEY ("week_id") REFERENCES "Week"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
