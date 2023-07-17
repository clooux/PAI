import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { StorageModule } from './storage/storage.module';
import { CoverModule } from './cover/cover.module';
import { resolve } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    PrismaModule,
    BookModule,
    AuthorModule,
    UserModule,
    AuthModule,
    OrderModule,
    StorageModule,
    CoverModule,
    ServeStaticModule.forRoot(
      (() => {
        const publicDir = resolve('./files/');
        const servePath = '/files';

        return {
          rootPath: publicDir,
          serveRoot: servePath,
          exclude: ['/api*'],
        };
      })(),
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
