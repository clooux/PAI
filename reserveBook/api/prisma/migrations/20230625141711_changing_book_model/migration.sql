/*
  Warnings:

  - Added the required column `language` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "language" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
