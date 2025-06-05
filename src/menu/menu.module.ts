import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PrismaService } from 'prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';

@Module({
  providers: [MenuService, PrismaService, S3Service],
  controllers: [MenuController]
})
export class MenuModule {}
