import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiCreatedResponse({ type: OrderEntity })
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  getOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  @ApiOkResponse({ type: OrderEntity })
  getOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrderById(id);
  }

  @Get('/user/:userId')
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  getOrdersForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.orderService.getOrdersByUserId(userId);
  }

  @Get('/user/past/:userId')
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  getPastOrdersForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.orderService.getPastOrdersByUserId(userId);
  }

  @Get('/user/current/:userId')
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  getCurrentOrdersForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.orderService.getCurrentOrdersByUserId(userId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrderById(id, updateOrderDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiNoContentResponse()
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.deleteOrderById(id);
  }
}
