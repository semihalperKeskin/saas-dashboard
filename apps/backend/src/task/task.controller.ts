import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskInput } from './dto/task.dto';
import { UUID } from 'crypto';

@Controller('task')
export class TaskController {
  constructor(private readonly task: TaskService) {}

  @Get()
  async findAll() {
    return this.task.findAll();
  }

  @Post()
  async create(@Body() task: TaskInput) {
    return this.task.create(task);
  }

  @Put('move')
  async move(
    @Body('columnUUID') columnUUID: UUID,
    @Body('taskUUID') taskUUID: UUID,
    @Body('index') index: number,
  ) {
    return this.task.move(columnUUID, taskUUID, index);
  }

  @Put('reorder')
  async reorder(
    @Body('taskUUID') taskUUID: UUID,
    @Body('index') index: number,
  ) {
    return this.task.reorder(taskUUID, index);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: UUID) {
    return this.task.remove(uuid);
  }
}
