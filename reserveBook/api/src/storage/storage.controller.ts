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
import { StorageService } from './storage.service';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderEntity } from 'src/order/entities/order.entity';

@Controller('storage')
@ApiTags('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: OrderEntity })
  createStorage(@Body() createStorageDto: CreateStorageDto) {
    return this.storageService.createStorage(createStorageDto);
  }

  @Get()
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  getStorageForAll() {
    return this.storageService.getStorageForAllBooks();
  }

  @Get(':bookId')
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  getStorageForBook(@Param('bookId', ParseIntPipe) bookId: number) {
    return this.storageService.getStorageByBookId(bookId);
  }

  @Get('free/:bookId')
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  getFreeStorageForBook(@Param('bookId', ParseIntPipe) bookId: number) {
    return this.storageService.getFreeStorageByBookId(bookId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: OrderEntity })
  updateStorage(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStorageDto: UpdateStorageDto,
  ) {
    return this.storageService.updateStorageById(id, updateStorageDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiNoContentResponse()
  removeStorage(@Param('id', ParseIntPipe) id: number) {
    return this.storageService.removeStorageById(id);
  }
}
