/*
  Warnings:

  - The primary key for the `Results` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Results` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Results_id_key";

-- DropIndex
DROP INDEX "Results_student_id_key";

-- AlterTable
ALTER TABLE "Results" DROP CONSTRAINT "Results_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Results_pkey" PRIMARY KEY ("student_id", "test_id");
