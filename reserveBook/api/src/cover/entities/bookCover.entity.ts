import { ApiProperty } from '@nestjs/swagger';
import { BookCover } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class BookCoverEntity implements BookCover {
  @ApiProperty()
  id: number;

  @ApiProperty()
  bookId: number;

  @ApiProperty()
  imageURL: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<BookCoverEntity>) {
    Object.assign(this, partial);
  }
}
