-- CreateTable
CREATE TABLE "Slot" (
    "id" SERIAL NOT NULL,
    "day" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "booked" BOOLEAN NOT NULL DEFAULT false,
    "bookedBy" VARCHAR(200),
    "doubtId" INTEGER,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_doubtId_fkey" FOREIGN KEY ("doubtId") REFERENCES "Doubts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
