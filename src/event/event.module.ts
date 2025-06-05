import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaService } from 'prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';

@Module({
  providers: [EventService, PrismaService, S3Service],
  controllers: [EventController]
})
export class EventModule {}
