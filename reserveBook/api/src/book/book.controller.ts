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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';
import { BookSimpleEntity } from './entities/bookSimple.entity';

@Controller('book')
@ApiTags('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: BookEntity })
  async createBook(@Body() createBookDto: CreateBookDto) {
    return new BookEntity(await this.bookService.createBook(createBookDto));
  }

  @Get()
  @ApiOkResponse({ type: BookEntity, isArray: true })
  async getBooks() {
    const books = await this.bookService.getAllBooks();
    return books.map((book) => new BookEntity(book));
  }

  @Get('simple')
  @ApiOkResponse({ type: BookSimpleEntity, isArray: true })
  async getBooksSimple() {
    const books = await this.bookService.getAllBooksWithoutDetails();
    return books.map((book) => new BookSimpleEntity(book));
  }

  @Get(':id')
  @ApiOkResponse({ type: BookEntity })
  async getBook(@Param('id', ParseIntPipe) id: number) {
    return new BookEntity(await this.bookService.getBookById(id));
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: BookEntity })
  updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.bookService.updateBookById(id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiNoContentResponse()
  deleteBook(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.deleteBookById(id);
  }
}
