import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/task.dto';
import { UUID } from 'crypto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(task: CreateTaskInput) {
    return this.prisma.task.create({
      data: {
        content: task.content,
        order: task.order,
        column: {
          connect: { uuid: task.columnUUID },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      where: {},
      orderBy: { order: 'asc' },
    });
  }

  async move(columnUUID: UUID, taskUUID: UUID, index: number) {
    return this.prisma.task.update({
      where: { uuid: taskUUID },
      data: {
        column: {
          connect: { uuid: columnUUID },
        },
        order: index,
      },
    });
  }

  async reorder(taskUUID: UUID, order: number) {
    return this.prisma.task.update({
      where: { uuid: taskUUID },
      data: { order: order },
    });
  }

  async remove(taskUUID: UUID) {
    return this.prisma.task.delete({
      where: { uuid: taskUUID },
    });
  }
}
