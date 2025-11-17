import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { UUID } from 'crypto';
import { CreateTaskInput, MoveTaskInput } from '@vizionboard/validation';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TaskController {
  constructor(private readonly task: TaskService) {}

  @Get()
  async findAll() {
    return this.task.findAll();
  }

  @Post()
  async create(@Body() task: CreateTaskInput) {
    return this.task.create(task);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Put('move')
  async move(@Body() moveTask: MoveTaskInput) {
    return this.task.move(moveTask);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: UUID) {
    return this.task.remove(uuid);
  }
}
