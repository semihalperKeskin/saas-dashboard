import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnInput } from './dto/column.dto';
import { UUID } from 'crypto';

@Controller('column')
export class ColumnController {
  constructor(private readonly column: ColumnService) {}

  @Get()
  async findAll() {
    return this.column.findAll();
  }

  @Post()
  async create(@Body() column: ColumnInput) {
    return this.column.create(column);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: UUID) {
    return this.column.remove(uuid);
  }
}
