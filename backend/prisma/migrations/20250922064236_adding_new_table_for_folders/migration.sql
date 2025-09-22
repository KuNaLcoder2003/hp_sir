/*
  Warnings:

  - Added the required column `folder_id` to the `Files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Files" ADD COLUMN     "folder_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Folder" (
    "id" SERIAL NOT NULL,
    "folder_name" VARCHAR(200) NOT NULL,
    "batch_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
