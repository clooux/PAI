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

@Module({
  imports: [
    PrismaModule,
    BookModule,
    AuthorModule,
    UserModule,
    AuthModule,
    OrderModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
