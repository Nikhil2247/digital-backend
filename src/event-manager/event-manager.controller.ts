import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { EventManagerService } from './event-manager.service';

@Controller('event-managers')
export class EventManagerController {
  constructor(private readonly eventManagerService: EventManagerService) {}

  @Post('assign')
  assign(@Body() body: { eventId: string; userId: string }) {
    return this.eventManagerService.assignManager(body.eventId, body.userId);
  }

  @Get()
  findAll() {
    return this.eventManagerService.findAll();
  }

  @Get('event/:eventId')
  findByEvent(@Param('eventId') eventId: string) {
    return this.eventManagerService.findByEvent(eventId);
  }
  @Get('manager/:vendorId')
  findByVendor(@Param('vendorId') vendorId: string) {
    return this.eventManagerService.findByVendor(vendorId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventManagerService.remove(id);
  }
}
