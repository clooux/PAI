/*
  Warnings:

  - Made the column `bookId` on table `Storage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BookCover" DROP CONSTRAINT "BookCover_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Storage" DROP CONSTRAINT "Storage_bookId_fkey";

-- AlterTable
ALTER TABLE "BookCover" ALTER COLUMN "bookId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Storage" ALTER COLUMN "bookId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookCover" ADD CONSTRAINT "BookCover_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
