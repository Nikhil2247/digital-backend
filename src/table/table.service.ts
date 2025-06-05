import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as QRCode from 'qrcode';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { number: number; eventId: string }) {
    const qrData = `https://omniserve.omnicassion.com/event/${data.eventId}/table/${data.number}`;
    const qrCode = await QRCode.toDataURL(qrData);

    return this.prisma.table.create({
      data: {
        number: data.number,
        qrCode,
        eventId: data.eventId,
      },
    });
  }

  async findAll() {
    return this.prisma.table.findMany({
      include: {
        event: true,
        orders: true,
      },
    });
  }

  async findOne(id: string) {
    const table = await this.prisma.table.findUnique({
      where: { id },
      include: {
        event: true,
        orders: true,
      },
    });
    if (!table) throw new NotFoundException('Table not found');
    return table;
  }

  async update(id: string, data: Partial<{ number: number }>) {
    return this.prisma.table.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.table.delete({
      where: { id },
    });
  }


}
