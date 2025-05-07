import { Get, Param, Patch } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log('id', id);
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number) {
    return this.userService.update(+id);
  }
}
