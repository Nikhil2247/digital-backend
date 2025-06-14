import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [TableService, PrismaService],
  controllers: [TableController]
})
export class TableModule {}
