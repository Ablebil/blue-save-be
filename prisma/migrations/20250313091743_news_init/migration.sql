-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ENVIRONMENT', 'CONSERVATION', 'EDUCATION', 'RESEARCH');

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);
