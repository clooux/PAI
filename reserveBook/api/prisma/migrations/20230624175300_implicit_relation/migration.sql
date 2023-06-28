/*
  Warnings:

  - You are about to drop the `AuthorsOnBooks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `publisher` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AuthorsOnBooks" DROP CONSTRAINT "AuthorsOnBooks_authorId_fkey";

-- DropForeignKey
ALTER TABLE "AuthorsOnBooks" DROP CONSTRAINT "AuthorsOnBooks_publicationId_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "pages" INTEGER,
ADD COLUMN     "publisher" TEXT NOT NULL;

-- DropTable
DROP TABLE "AuthorsOnBooks";

-- CreateTable
CREATE TABLE "_AuthorToBook" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToBook_AB_unique" ON "_AuthorToBook"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToBook_B_index" ON "_AuthorToBook"("B");

-- AddForeignKey
ALTER TABLE "_AuthorToBook" ADD CONSTRAINT "_AuthorToBook_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToBook" ADD CONSTRAINT "_AuthorToBook_B_fkey" FOREIGN KEY ("B") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
