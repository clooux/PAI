import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BookCoverEntity } from 'src/cover/entities/bookCover.entity';

export class BookSimpleEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @Exclude()
  description: string;

  @Exclude()
  publisher: string;

  @Exclude()
  publishingDate: Date;

  @Exclude()
  language: string;

  @Exclude()
  pages: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty({ type: BookCoverEntity })
  bookCover?: BookCoverEntity;

  constructor({ bookCover, ...data }: Partial<BookSimpleEntity>) {
    Object.assign(this, data);

    if (bookCover) {
      this.bookCover = new BookCoverEntity(bookCover);
    }
  }
}
