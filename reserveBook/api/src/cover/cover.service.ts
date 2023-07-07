import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoverService {
  constructor(private prisma: PrismaService) {}

  async createCover(file: Express.Multer.File) {
    return this.prisma.bookCover.create({
      data: {
        imageURL: file.filename,
      },
    });
  }

  async getCoverById(id: number) {
    const cover = await this.prisma.bookCover.findUnique({ where: { id } });

    if (!cover) {
      throw new NotFoundException();
    }

    return cover;
  }
}
