import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { EventVendorService } from './event-vendor.service';

@Controller('event-vendors')
export class EventVendorController {
  constructor(private readonly eventVendorService: EventVendorService) {}

  @Post('assign')
  assign(@Body() body: { eventId: string; userId: string }) {
    return this.eventVendorService.assignVendor(body.eventId, body.userId);
  }

  @Get()
  findAll() {
    return this.eventVendorService.findAll();
  }

   @Get('vendor/:vendorId')
    findByVendor(@Param('vendorId') vendorId: string) {
      return this.eventVendorService.findByVendor(vendorId);
    }

  @Get('event/:eventId')
  findByEvent(@Param('eventId') eventId: string) {
    return this.eventVendorService.findByEvent(eventId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventVendorService.remove(id);
  }
}
