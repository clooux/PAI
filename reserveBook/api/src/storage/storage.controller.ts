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
import { StorageService } from './storage.service';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('storage')
@ApiTags('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  createStorage(@Body() createStorageDto: CreateStorageDto) {
    return this.storageService.createStorage(createStorageDto);
  }

  @Get()
  getStorages() {
    return this.storageService.getAllStorages();
  }

  @Get(':id')
  getStorage(@Param('id', ParseIntPipe) id: number) {
    return this.storageService.getStorageById(id);
  }

  // @Patch(':id')
  // updateStorage(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateStorageDto: UpdateStorageDto,
  // ) {
  //   return this.storageService.updateStorageById(id, updateStorageDto);
  // }

  @Delete(':id')
  removeStorage(@Param('id', ParseIntPipe) id: number) {
    return this.storageService.removeStorageById(id);
  }
}
