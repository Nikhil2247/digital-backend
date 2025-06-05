import { Module } from '@nestjs/common';
import { EventVendorController } from './event-vendor.controller';
import { EventVendorService } from './event-vendor.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [EventVendorController],
  providers: [EventVendorService, PrismaService]
})
export class EventVendorModule {}
