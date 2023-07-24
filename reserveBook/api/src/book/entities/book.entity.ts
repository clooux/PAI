import { ApiProperty } from '@nestjs/swagger';
import { Book, Genre } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { AuthorEntity } from 'src/author/entities/author.entity';
import { BookCoverEntity } from 'src/cover/entities/bookCover.entity';
import { StorageEntity } from 'src/storage/entities/storage.entity';

export class BookEntity implements Book {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  genre: Genre;

  @ApiProperty()
  publisher: string;

  @ApiProperty()
  publishingDate: Date;

  @ApiProperty()
  language: string;

  @ApiProperty()
  pages: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty({ type: AuthorEntity })
  authors?: AuthorEntity[];

  @ApiProperty({ type: BookCoverEntity })
  bookCover?: BookCoverEntity;

  @ApiProperty({ type: StorageEntity })
  storage?: StorageEntity[];

  constructor({ authors, storage, bookCover, ...data }: Partial<BookEntity>) {
    Object.assign(this, data);

    if (bookCover) {
      this.bookCover = new BookCoverEntity(bookCover);
    }

    if (authors?.length) {
      this.authors = authors.map((author) => new AuthorEntity(author));
    }

    if (storage?.length) {
      this.storage = storage.map((copy) => new StorageEntity(copy));
    } else {
      this.storage = [];
    }
  }
}
