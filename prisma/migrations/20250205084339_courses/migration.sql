-- CreateTable
CREATE TABLE "courses" (
    "id" SERIAL NOT NULL,
    "coursename" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);
