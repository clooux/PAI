import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  createOrder(createOrderDto: CreateOrderDto) {
    return this.prisma.order.create({ data: createOrderDto });
  }

  async getAllOrders() {
    const orders = await this.prisma.order.findMany();

    if (!orders.length) {
      throw new NotFoundException();
    }

    return orders;
  }

  async getOrderById(id: number) {
    const order = await this.prisma.order.findUnique({ where: { id } });

    if (!order) {
      throw new NotFoundException();
    }

    return order;
  }

  async getOrdersByUserId(userId: number) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: { storage: true },
    });

    if (!orders.length) {
      throw new NotFoundException();
    }

    return orders;
  }

  async getPastOrdersByUserId(userId: number) {
    const orders = await this.prisma.order.findMany({
      where: { userId, returnedDate: { not: null } },
      include: { storage: { include: { book: true } } },
    });

    return orders;
  }

  async getCurrentOrdersByUserId(userId: number) {
    const orders = await this.prisma.order.findMany({
      where: { userId, returnedDate: null },
      include: { storage: { include: { book: true } } },
    });

    return orders;
  }

  async updateOrderById(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });

    if (!order) {
      throw new NotFoundException();
    }

    return await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  async deleteOrderById(id: number) {
    return await this.prisma.order.delete({ where: { id } });
  }
}
