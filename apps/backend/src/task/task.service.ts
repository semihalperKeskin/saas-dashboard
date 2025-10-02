import { Injectable } from '@nestjs/common';
import { CreateTaskInput, MoveTaskInput } from './dto/task.dto';
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

  async move(moveTask: MoveTaskInput) {
    const { columnUUID, taskUUID, order, sourceColId, destColId } = moveTask;

    if (sourceColId != destColId) {
      await this.prisma.task.update({
        where: { uuid: taskUUID },
        data: {
          column: {
            connect: { uuid: columnUUID },
          },
          order: order,
        },
      });
    }

    const tasks = await this.prisma.task.findMany({
      where: { columnId: columnUUID },
      orderBy: { order: 'asc' },
    });

    const fromIndex = tasks.findIndex((t) => t.uuid === taskUUID);
    if (fromIndex === -1) return;

    const [movedTask] = tasks.splice(fromIndex, 1);

    tasks.splice(order, 0, movedTask);

    return await this.prisma.$transaction(
      tasks.map((t, i) =>
        this.prisma.task.update({
          where: { id: t.id },
          data: { order: i },
        }),
      ),
    );
  }

  async remove(taskUUID: UUID) {
    return this.prisma.task.delete({
      where: { uuid: taskUUID },
    });
  }
}
