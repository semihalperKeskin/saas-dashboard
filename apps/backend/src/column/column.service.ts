import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ColumnInput } from './dto/column.dto';
import { UUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ColumnService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number) {
    return this.prisma.column.findMany({
      where: { board: { userId } },
      include: {
        tasks: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async create(column: ColumnInput, userId: number) {
    const userBoard = await this.prisma.board.findFirst({
      where: { userId: userId },
    });

    if (!userBoard) {
      throw new NotFoundException('Kullanıcıya ait bir pano bulunamadı.');
    }

    return this.prisma.column.create({
      data: {
        title: column.title,
        boardId: userBoard.id,
      },
    });
  }

  async update() {}

  async remove(uuid: UUID, userId: number) {
    const column = await this.prisma.column.findUnique({
      where: { uuid: uuid },
      include: { board: true },
    });

    if (!column) {
      throw new NotFoundException('Kolon bulunamadı.');
    }

    if (column.board.userId !== userId) {
      throw new ForbiddenException('Bu kolonu silme yetkiniz yok.');
    }

    return this.prisma.column.delete({
      where: { uuid: uuid },
    });
  }
}
