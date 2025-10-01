/*
  Warnings:

  - You are about to drop the column `subjectId` on the `SubFolders` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `SubFolders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubFolders" DROP COLUMN "subjectId",
DROP COLUMN "type";
