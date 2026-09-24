import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnInput, ColumnSchema } from './dto/column.dto';
import { UUID } from 'crypto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ZodValidationPipe } from 'src/common/pipes/ZodValidationPipes';

interface RequestWithUser extends Request {
  user: {
    id: number;
  };
}

@Controller('column')
@UseGuards(AuthGuard('jwt-access'))
export class ColumnController {
  constructor(private readonly column: ColumnService) {}

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.column.findAll(userId);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(ColumnSchema))
  async create(@Body() column: ColumnInput, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.column.create(column, userId);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: UUID, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.column.remove(uuid, userId);
  }
}
