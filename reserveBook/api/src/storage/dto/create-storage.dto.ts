import { ApiProperty } from '@nestjs/swagger';

export class CreateStorageDto {
  @ApiProperty()
  bookId: number;
}
