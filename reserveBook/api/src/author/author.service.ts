import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async createAuthor(createAuthorDto: CreateAuthorDto) {
    return await this.prisma.author.create({ data: createAuthorDto });
  }

  async getAllAuthors() {
    const authors = await this.prisma.author.findMany();

    if (!authors.length) {
      throw new NotFoundException();
    }

    return authors;
  }

  async getAuthorById(id: number) {
    const author = await this.prisma.author.findUnique({
      where: {
        id,
      },
      include: {
        books: true,
      },
    });

    if (!author) {
      throw new NotFoundException();
    }

    return author;
  }

  async getAuthorsByIds(ids: number[]) {
    const authors = await this.prisma.author.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    if (!authors.length) {
      throw new NotFoundException();
    }

    return authors;
  }

  async updateAuthorById(id: number, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.prisma.author.findUnique({ where: { id } });

    if (!author) {
      throw new NotFoundException();
    }

    return await this.prisma.author.update({
      where: {
        id,
      },
      data: updateAuthorDto,
    });
  }

  async deleteAuthorById(id: number) {
    return await this.prisma.author.delete({ where: { id } });
  }
}
