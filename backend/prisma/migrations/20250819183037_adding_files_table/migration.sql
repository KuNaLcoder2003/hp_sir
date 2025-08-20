-- CreateTable
CREATE TABLE "Files" (
    "id" SERIAL NOT NULL,
    "file_name" VARCHAR(200) NOT NULL,
    "file_url" TEXT NOT NULL,
    "batch_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Files_id_key" ON "Files"("id");

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
