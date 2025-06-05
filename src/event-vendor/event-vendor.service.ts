import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EventVendorService {
  constructor(private readonly prisma: PrismaService) {}

  async assignVendor(eventId: string, userId: string) {
    const exists = await this.prisma.eventVendor.findFirst({
      where: { eventId, userId },
    });
    if (exists)
      throw new Error('User is already assigned as vendor to this event.');

    return this.prisma.eventVendor.create({
      data: { eventId, userId },
    });
  }

  async findAll() {
    return this.prisma.eventVendor.findMany({
      include: { user: true, event: true },
    });
  }

  async findByEvent(eventId: string) {
    return this.prisma.eventVendor.findMany({
      where: { eventId },
      include: { user: true },
    });
  }

  async findByVendor(userId: string) {
    return this.prisma.eventVendor.findMany({
      where: { userId },
      include: {
        user: true,
        event: {
          include: {
            menuItems: true,
            orders: true
          },
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.eventVendor.delete({ where: { id } });
  }
}
