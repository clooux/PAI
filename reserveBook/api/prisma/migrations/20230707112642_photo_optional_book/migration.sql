-- DropForeignKey
ALTER TABLE "Storage" DROP CONSTRAINT "Storage_bookId_fkey";

-- AlterTable
ALTER TABLE "Storage" ALTER COLUMN "bookId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
