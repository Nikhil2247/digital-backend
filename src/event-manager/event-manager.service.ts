import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EventManagerService {
  constructor(private readonly prisma: PrismaService) {}

  async assignManager(eventId: string, userId: string) {
    // Optionally: check if already assigned
    const exists = await this.prisma.eventManager.findFirst({
      where: { eventId, userId },
    });
    if (exists) throw new Error('User is already assigned as manager to this event.');

    return this.prisma.eventManager.create({
      data: { eventId, userId },
    });
  }

  async findAll() {
    return this.prisma.eventManager.findMany({
      include: { user: true, event: true },
    });
  }

  async findByEvent(eventId: string) {
    return this.prisma.eventManager.findMany({
      where: { eventId },
      include: { user: true },
    });
  }

   async findByVendor(userId: string) {
    return this.prisma.eventManager.findMany({
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
    return this.prisma.eventManager.delete({ where: { id } });
  }
}
