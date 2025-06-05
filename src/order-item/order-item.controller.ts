import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { OrderItemService } from './order-item.service';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(@Body() body: { orderId: string; menuItemId: string; quantity: number }) {
    return this.orderItemService.create(body);
  }

  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get('order/:orderId')
  findByOrder(@Param('orderId') orderId: string) {
    return this.orderItemService.findByOrder(orderId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { quantity: number }) {
    return this.orderItemService.update(id, body.quantity);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(id);
  }
}
