-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('Art_Architecture', 'Autobiography', 'ActionAndAdventure', 'AlternateHistory', 'Anthology', 'Biography', 'Business_economics', 'Children', 'Crafts_hobbies', 'Classic', 'Cookbook', 'ComicBook', 'Diary', 'ComingOfAge', 'Dictionary', 'Crime', 'Encyclopedia', 'Drama', 'Guide', 'Fairytale', 'Health_fitness', 'Fantasy', 'History', 'GraphicNovel', 'HomeAndGarden', 'HistoricalFiction', 'Humor', 'Horror', 'Journal', 'Mystery', 'Math', 'ParanormalRomance', 'Memoir', 'PictureBook', 'Philosophy', 'Poetry', 'Prayer', 'PoliticalThriller', 'Romance', 'Textbook', 'Satire', 'ScienceFiction', 'Review', 'ShortStory', 'Science', 'Suspense', 'SelfHelp', 'Thriller', 'SportsAndLeisure', 'Western', 'Travel', 'YoungAdult', 'TrueCrime');

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "genre" "Genre" NOT NULL,
    "publishingDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorsOnBooks" (
    "publicationId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "AuthorsOnBooks_pkey" PRIMARY KEY ("publicationId","authorId")
);

-- AddForeignKey
ALTER TABLE "AuthorsOnBooks" ADD CONSTRAINT "AuthorsOnBooks_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorsOnBooks" ADD CONSTRAINT "AuthorsOnBooks_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
