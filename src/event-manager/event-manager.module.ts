import { Module } from '@nestjs/common';
import { EventManagerController } from './event-manager.controller';
import { EventManagerService } from './event-manager.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [EventManagerController],
  providers: [EventManagerService, PrismaService]
})
export class EventManagerModule {}
