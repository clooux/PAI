/*
  Warnings:

  - Added the required column `bookCoverId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "bookCoverId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "BookCover" (
    "id" SERIAL NOT NULL,
    "imageURL" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookCover_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BookCover_imageURL_key" ON "BookCover"("imageURL");

-- CreateIndex
CREATE UNIQUE INDEX "BookCover_bookId_key" ON "BookCover"("bookId");

-- AddForeignKey
ALTER TABLE "BookCover" ADD CONSTRAINT "BookCover_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
