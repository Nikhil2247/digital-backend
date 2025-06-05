import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class MenuService {
  constructor(
    private readonly prisma: PrismaService,
    private s3Service: S3Service,
  ) {}

  async create(data: {
    name: string;
    description?: string;
    price: number;
    eventId: string;
    photo: Express.Multer.File | string;
    tag: string;
    recTag: string;
  }) {
    let imageUrl: string;

    if (typeof data.photo === 'string') {
      imageUrl = data.photo; // already a URL
    } else {
      imageUrl = await this.s3Service.uploadFile(data.photo);
    }

    const menu = await this.prisma.menuItem.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        eventId: data.eventId,
        photo: imageUrl,
        tag: data.tag,
        recTag: data.recTag,
      },
    });

    return menu;
  }

  async findAll() {
    return this.prisma.menuItem.findMany({
      include: { event: true },
    });
  }

  async findByEvent(eventId: string) {
    return this.prisma.menuItem.findMany({
      where: { eventId },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.menuItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Menu item not found');
    return item;
  }

  async update(
    id: string,
    data: Partial<{ name: string; description?: string; price: number }>,
  ) {
    return this.prisma.menuItem.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.menuItem.delete({ where: { id } });
  }
}
