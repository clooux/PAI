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
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthorEntity } from './entities/author.entity';

@Controller('author')
@ApiTags('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AuthorEntity })
  async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return new AuthorEntity(
      await this.authorService.createAuthor(createAuthorDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: AuthorEntity, isArray: true })
  async getAuthors() {
    const authors = await this.authorService.getAllAuthors();
    return authors.map((author) => new AuthorEntity(author));
  }

  @Get(':id')
  @ApiOkResponse({ type: AuthorEntity })
  async getAuthor(@Param('id', ParseIntPipe) id: number) {
    return new AuthorEntity(await this.authorService.getAuthorById(id));
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: AuthorEntity })
  async updateAuthor(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return new AuthorEntity(
      await this.authorService.updateAuthorById(id, updateAuthorDto),
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiNoContentResponse()
  deleteAuthor(@Param('id', ParseIntPipe) id: number) {
    return this.authorService.deleteAuthorById(id);
  }
}
