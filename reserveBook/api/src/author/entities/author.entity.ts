import { ApiProperty } from '@nestjs/swagger';
import { Author } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AuthorEntity implements Author {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<AuthorEntity>) {
    Object.assign(this, partial);
  }
}
