import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  getOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrderById(id);
  }

  @Get('/user/:userId')
  getOrdersForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.orderService.getOrdersByUserId(userId);
  }

  @Get('/user/past/:userId')
  getPastOrdersForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.orderService.getPastOrdersByUserId(userId);
  }

  @Get('/user/current/:userId')
  getCurrentOrdersForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.orderService.getCurrentOrdersByUserId(userId);
  }

  @Patch(':id')
  updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrderById(id, updateOrderDto);
  }

  @Delete(':id')
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.deleteOrderById(id);
  }
}
