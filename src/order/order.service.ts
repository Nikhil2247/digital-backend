// order.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
   // private readonly notificationService: NotificationService,
  ) {}

  async create(data: {
    eventId: string;
    tableId: string;
    guestId?: string;
    items: { menuItemId: string; quantity: number }[];
  }) {
    const order = await this.prisma.order.create({
      data: {
        eventId: data.eventId,
        tableId: data.tableId,
        guestId: data.guestId,
      },
    });

    const orderItems = await Promise.all(
      data.items.map((item) =>
        this.prisma.orderItem.create({
          data: {
            orderId: order.id,
            menuItemId: item.menuItemId,
            quantity: item.quantity,
          },
        }),
      ),
    );
  //  this.notificationService.emitOrderStatusUpdate(order);
    return { ...order, orderItems };
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        orderItems: { include: { menuItem: true } },
        table: true,
        guest: true,
      },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: { include: { menuItem: true } },
        table: true,
        guest: true,
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async findByEvent(eventId: string) {
    const order = await this.prisma.order.findMany({
      where: { eventId:eventId },
      include: {
        orderItems: { include: { menuItem: true } },
        table: true,
        guest: true,
      },
    });
    if (!order || order.length === 0) throw new NotFoundException('Order not found');
    return order;
  }

  async updateStatus(
    id: string,
    status: 'PENDING' | 'IN_PROGRESS' | 'READY' | 'SERVED',
  ) {
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: { status },
    });
    // console.log('Notifying order update', updatedOrder);
    // Notify status update
    // Create a message payload
    const message = {
      type: 'ORDER_STATUS_UPDATE',
      orderId: id,
      status: status,
      message: `Order is ${status.replace('_', ' ').toLowerCase()}`,
    };

    // Emit the structured message
    //this.notificationService.emitOrderStatusUpdate(message);
    //this.notificationService.emitOrderStatusUpdate(updatedOrder);
    return updatedOrder;
  }

  async remove(id: string) {
    // first remove all items for this order
    await this.prisma.orderItem.deleteMany({ where: { orderId: id } });
    // then delete the order itself
    return this.prisma.order.delete({ where: { id } });
  }
}
