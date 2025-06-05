import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EventService } from './event.service';
import { ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async createEvent(
    @Body()
    body: {
      name: string;
      description?: string;
      startDate: string; // will parse to Date in service
      endDate: string;
      venue: string;
      // photo is handled by multer as @UploadedFile()
    },
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    const event = await this.eventService.create({
      ...body,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      photo: photo || '', // photo can be file or string (empty string here if none)
    });
    return event;
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo'))
  async updateEvent(
    @Param('id') id: string,
    @Body()
    body: {
      name?: string;
      description?: string;
      startDate?: string;
      endDate?: string;
      venue?: string;
    },
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    const updateData = {
      ...body,
      startDate: body.startDate ? new Date(body.startDate) : undefined,
      endDate: body.endDate ? new Date(body.endDate) : undefined,
      photo: photo, // Only pass if a file is uploaded; string URLs can be handled elsewhere
    };

    const updatedEvent = await this.eventService.update(id, updateData);
    return updatedEvent;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }

  @Get(':eventId/number/:number')
  findByEventAndNumber(
    @Param('eventId') eventId: string,
    @Param('number', ParseIntPipe) number: number,
  ) {
    return this.eventService.findByEventAndNumber(eventId, number);
  }
}
