-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(200) NOT NULL,
    "last_name" VARCHAR(200) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(200) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_id_key" ON "Teacher"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");
