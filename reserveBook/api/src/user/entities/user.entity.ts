import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { OrderEntity } from 'src/order/entities/order.entity';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  orders: OrderEntity[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
