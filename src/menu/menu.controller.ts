import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body()
    body: {
      name: string;
      description?: string;
      price: number;
      eventId: string;
      tag: string;
      recTag: string;
    },
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    const event = await this.menuService.create({
      ...body,

      photo: photo || '', // photo can be file or string (empty string here if none)
    });
    return event;
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get('event/:eventId')
  findByEvent(@Param('eventId') eventId: string) {
    return this.menuService.findByEvent(eventId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.menuService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
