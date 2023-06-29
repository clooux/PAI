import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  returnDate: Date;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  storageId: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  userId: number;
}
