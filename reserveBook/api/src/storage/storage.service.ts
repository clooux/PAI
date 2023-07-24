import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StorageService {
  constructor(private prisma: PrismaService) {}

  async createStorage(createStorageDto: CreateStorageDto) {
    return await this.prisma.storage.create({ data: createStorageDto });
  }

  async getStorageForAllBooks() {
    const storages = await this.prisma.storage.findMany();

    if (!storages.length) {
      throw new NotFoundException();
    }

    return storages;
  }

  async getStorageById(id: number) {
    const storage = await this.prisma.storage.findUnique({ where: { id } });

    if (!storage) {
      throw new NotFoundException();
    }

    return storage;
  }

  async getStorageByBookId(bookId: number) {
    const storage = await this.prisma.storage.findMany({ where: { bookId } });

    if (!storage) {
      throw new NotFoundException();
    }

    return storage;
  }

  async getFreeStorageByBookId(bookId: number) {
    const storage = await this.prisma.storage.findMany({
      where: { bookId },
      include: { orders: true },
    });

    if (!storage) {
      throw new NotFoundException();
    }

    const freeStorage = [];

    storage.forEach((book) => {
      if (!book.orders.length) {
        freeStorage.push(book);
      } else {
        if (book.orders.find((order) => order.returnDate == null)) {
          freeStorage.push(book);
        }
      }
    });

    return freeStorage;
  }

  async updateStorageById(id: number, updateStorageDto: UpdateStorageDto) {
    const storage = await this.prisma.storage.findUnique({ where: { id } });

    if (!storage) {
      throw new NotFoundException();
    }

    return await this.prisma.storage.update({
      where: { id },
      data: updateStorageDto,
    });
  }

  async removeStorageById(id: number) {
    return await this.prisma.storage.delete({ where: { id } });
  }
}
