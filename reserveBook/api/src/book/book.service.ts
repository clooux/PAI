import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookSimpleEntity } from './entities/bookSimple.entity';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async createBook({
    title,
    description,
    genre,
    publisher,
    publishingDate,
    language,
    pages,
    authorsIds,
  }: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        title,
        description,
        genre,
        publisher,
        publishingDate,
        language,
        pages,
        authors: {
          connect: authorsIds.map((authorId) => ({ id: authorId })),
        },
      },
    });
  }

  async getAllBooks() {
    const books = await this.prisma.book.findMany();

    if (!books.length) {
      throw new NotFoundException();
    }

    return books;
  }

  async getAllBooksWithoutDetails() {
    const books = await this.prisma.book.findMany({
      include: { BookCover: true },
    });

    if (!books.length) {
      throw new NotFoundException();
    }

    return books.map((book) => {
      return new BookSimpleEntity(book);
    });
  }

  async getBookById(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { authors: true, BookCover: true, storage: true },
    });

    if (!book) {
      throw new NotFoundException();
    }

    return book;
  }

  async updateBookById(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
      include: {
        authors: true,
        BookCover: true,
      },
    });

    if (!book) {
      throw new NotFoundException();
    }

    return await this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async deleteBookById(id: number) {
    return await this.prisma.book.delete({
      where: {
        id,
      },
    });
  }
}
