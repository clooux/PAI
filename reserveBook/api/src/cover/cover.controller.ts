import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  ParseIntPipe,
  Get,
  StreamableFile,
  Header,
} from '@nestjs/common';
import { CoverService } from './cover.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './config/multer.config';
import { createReadStream } from 'fs';
import { join } from 'path';
import { BookCoverEntity } from './entities/bookCover.entity';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('cover')
export class CoverController {
  constructor(private readonly coverService: CoverService) {}

  @Post('upload')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('cover', multerOptions))
  @ApiCreatedResponse({ type: BookCoverEntity })
  uploadCover(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.coverService.createCover(file);
  }

  @Get(':id')
  @Header('Content-Type', 'image/jpeg')
  async downloadCover(@Param('id', ParseIntPipe) id: number) {
    const cover = await this.coverService.getCoverById(id);
    const file = createReadStream(
      join(process.cwd(), process.env.UPLOAD_DIR, cover.imageURL),
    );
    return new StreamableFile(file);
  }
}
