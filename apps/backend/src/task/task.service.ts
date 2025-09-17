import { Injectable } from '@nestjs/common';
import { TaskInput } from './dto/task.dto';
import { UUID } from 'crypto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(task: TaskInput) {
    return this.prisma.task.create({
      data: {
        content: task.content,
        order: task.order || 0,
        column: {
          connect: { uuid: task.column },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      where: {},
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

  async reorder(taskUUID: UUID, index: number) {
    return this.prisma.task.update({
      where: { uuid: taskUUID },
      data: { order: index },
    });
  }

  async remove(taskUUID: UUID) {
    return this.prisma.task.delete({
      where: { uuid: taskUUID },
    });
  }
}
