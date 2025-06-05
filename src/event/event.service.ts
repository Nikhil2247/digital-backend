import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Event } from '@prisma/client';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class EventService {
  constructor(
    private readonly prisma: PrismaService,
    private s3Service: S3Service,
  ) {}

  async create(data: {
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    photo: Express.Multer.File | string;
    venue: string;
  }): Promise<Event> {
    let imageUrl: string;

    if (typeof data.photo === 'string') {
      imageUrl = data.photo; // already a URL
    } else {
      imageUrl = await this.s3Service.uploadFile(data.photo);
    }

    const event = await this.prisma.event.create({
      data: {
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        photo: imageUrl,
        venue: data.venue,
      },
    });
    return event;
  }

  async findAll(): Promise<Event[]> {
    return this.prisma.event.findMany({
      include: {
        managers: true,
        vendors: true,
        tables: true,
        menuItems: true,
        orders: true,
      },
    });
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        managers: true,
        vendors: true,
        tables: true,
        menuItems: true,
        orders: true,
      },
    });

    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

async update(
  id: string,
  data: Partial<Omit<Event, 'photo'>> & { photo?: Express.Multer.File | string }
): Promise<Event> {
  let updateData: any = { ...data };

  if (data.photo) {
    if (typeof data.photo === 'string') {
      updateData.photo = data.photo;
    } else {
      const imageUrl = await this.s3Service.uploadFile(data.photo);
      updateData.photo = imageUrl;
    }
  }

  return this.prisma.event.update({
    where: { id },
    data: updateData,
  });
}

  async remove(id: string): Promise<Event> {
    return this.prisma.event.delete({
      where: { id },
    });
  }

  async findByEventAndNumber(eventId: string, number: number) {
    return this.prisma.table.findFirst({
      where: {
        eventId,
        number,
      },
      include: {
        event: {
          include: {
            menuItems: true, // ✅ Include menu items of the event
          },
        },
        // orders: true,
      },
    });
  }
}
