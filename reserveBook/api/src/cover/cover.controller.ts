import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  ParseIntPipe,
  Get,
  Res,
  StreamableFile,
  Header,
} from '@nestjs/common';
import { CoverService } from './cover.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './config/multer.config';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('cover')
export class CoverController {
  constructor(private readonly coverService: CoverService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('cover', multerOptions))
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
