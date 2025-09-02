-- CreateTable
CREATE TABLE "Doubts" (
    "id" SERIAL NOT NULL,
    "user_email" VARCHAR(200) NOT NULL,
    "doubt_type" VARCHAR(200) NOT NULL,
    "class" VARCHAR(200) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "meeting_id" TEXT NOT NULL DEFAULT '',
    "request_accepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Doubts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" SERIAL NOT NULL,
    "meeting_id" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "date" TIMESTAMP(3) NOT NULL,
    "doubt_id" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "user_email" VARCHAR(200) NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doubts_id_key" ON "Doubts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_id_key" ON "Meeting"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_doubt_id_key" ON "Meeting"("doubt_id");

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_doubt_id_fkey" FOREIGN KEY ("doubt_id") REFERENCES "Doubts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
