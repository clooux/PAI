import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class OrderEntity implements Order {
  @ApiProperty()
  id: number;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  returnDate: Date;

  @ApiProperty()
  bookId: number;

  @ApiProperty()
  userId: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
