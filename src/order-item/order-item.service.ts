import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { orderId: string; menuItemId: string; quantity: number }) {
    return this.prisma.orderItem.create({ data });
  }

  async findAll() {
    return this.prisma.orderItem.findMany({
      include: { order: true, menuItem: true },
    });
  }

  async findByOrder(orderId: string) {
    return this.prisma.orderItem.findMany({
      where: { orderId },
      include: { menuItem: true },
    });
  }

  async update(id: string, quantity: number) {
    return this.prisma.orderItem.update({
      where: { id },
      data: { quantity },
    });
  }

  async remove(id: string) {
    return this.prisma.orderItem.delete({ where: { id } });
  }
}
