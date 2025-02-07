/*
  Warnings:

  - You are about to drop the `courses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "courses";

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "coursename" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);
