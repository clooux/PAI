import { ApiProperty } from '@nestjs/swagger';
import { Book, Genre } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { AuthorEntity } from 'src/author/entities/author.entity';

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

  constructor({ authors, ...data }: Partial<BookEntity>) {
    Object.assign(this, data);

    if (authors.length) {
      this.authors = authors.map((author) => new AuthorEntity(author));
    }
  }
}
