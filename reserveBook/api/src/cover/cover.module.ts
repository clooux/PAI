import { Module } from '@nestjs/common';
import { CoverService } from './cover.service';
import { CoverController } from './cover.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CoverController],
  providers: [CoverService],
})
export class CoverModule {}
