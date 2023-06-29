import { ApiProperty } from '@nestjs/swagger';
import { Storage } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { OrderEntity } from 'src/order/entities/order.entity';

export class StorageEntity implements Storage {
  @ApiProperty()
  id: number;

  @ApiProperty()
  bookId: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  orders: OrderEntity[];
}
