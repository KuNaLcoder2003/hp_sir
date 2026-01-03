-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "mobile" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "class" VARCHAR(255) NOT NULL,
    "registered_batch_id" TEXT NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batch" (
    "id" TEXT NOT NULL,
    "batch_name" VARCHAR(255) NOT NULL,
    "batch_description" VARCHAR(255) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "currently_accepting" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapter" (
    "id" TEXT NOT NULL,
    "chapter_name" VARCHAR(255) NOT NULL,
    "batch_id" TEXT NOT NULL,

    CONSTRAINT "chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material" (
    "id" TEXT NOT NULL,
    "notes_title" VARCHAR(255) NOT NULL,
    "chapter_id" TEXT NOT NULL,
    "notes_link" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video" (
    "id" TEXT NOT NULL,
    "video_title" VARCHAR(255) NOT NULL,
    "chapter_id" TEXT NOT NULL,
    "video_link" TEXT NOT NULL,

    CONSTRAINT "video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_registered_batch_id_fkey" FOREIGN KEY ("registered_batch_id") REFERENCES "batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter" ADD CONSTRAINT "chapter_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material" ADD CONSTRAINT "material_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video" ADD CONSTRAINT "video_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
