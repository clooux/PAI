import { ApiProperty } from '@nestjs/swagger';

export class BookSimpleEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  constructor(partial: Partial<BookSimpleEntity>) {
    Object.assign(this, partial);
  }
}
