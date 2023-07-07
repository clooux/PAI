import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const multerOptions: MulterOptions = {
  limits: {
    fileSize: 5242880,
  },
  fileFilter(req, file, callback) {
    if (file.mimetype.match(/\/(jpg|png|jpeg)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException('Unsupported file type', HttpStatus.BAD_REQUEST),
        false,
      );
    }
  },
  storage: diskStorage({
    destination(req, file, callback) {
      const uploadPath = process.env.UPLOAD_DIR;

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },

    filename(req, file, callback) {
      callback(null, generateFileName(file.originalname));
    },
  }),
};

function generateFileName(originalName: string) {
  const fileExtension = extname(originalName);
  return `${uuid()}${fileExtension}`;
}
