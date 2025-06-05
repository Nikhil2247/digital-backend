import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(
    @Body()
    body: {
      eventId: string;
      tableId: string;
      guestId?: string;
      items: { menuItemId: string; quantity: number }[];
    },
  ) {
    return this.orderService.create(body);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Get(':eventId')
  findByEvent(@Param('id') id: string) {
    return this.orderService.findByEvent(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: 'PENDING' | 'IN_PROGRESS' | 'READY' | 'SERVED' },
  ) {
    return this.orderService.updateStatus(id, body.status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
