/*
  Warnings:

  - You are about to drop the column `folder_id` on the `Content` table. All the data in the column will be lost.
  - Added the required column `sub_folder_id` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_folder_id_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "folder_id",
ADD COLUMN     "sub_folder_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Videos" (
    "id" SERIAL NOT NULL,
    "video_name" VARCHAR(200) NOT NULL,
    "content_url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "uploaded_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sub_folder_id" INTEGER NOT NULL,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubFolders" (
    "id" SERIAL NOT NULL,
    "subfolder_name" VARCHAR(200) NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "uploaded_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "folder_id" INTEGER NOT NULL,

    CONSTRAINT "SubFolders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Videos_id_key" ON "Videos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SubFolders_id_key" ON "SubFolders"("id");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_sub_folder_id_fkey" FOREIGN KEY ("sub_folder_id") REFERENCES "SubFolders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_sub_folder_id_fkey" FOREIGN KEY ("sub_folder_id") REFERENCES "SubFolders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubFolders" ADD CONSTRAINT "SubFolders_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
