import { Injectable } from '@nestjs/common';
import { ColumnInput } from './dto/column.dto';
import { UUID } from 'crypto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ColumnService {
  constructor(private readonly prisma: PrismaService) {}

  async create(column: ColumnInput) {
    return this.prisma.column.create({
      data: {
        title: column.title,
        order: column.order,
      },
    });
  }

  async findAll() {
    return this.prisma.column.findMany({
      where: {},
      include: {
        tasks: true,
      },
    });
  }

  async update() {}

  async remove(uuid: UUID) {
    return this.prisma.column.delete({
      where: { uuid: uuid },
    });
  }
}
