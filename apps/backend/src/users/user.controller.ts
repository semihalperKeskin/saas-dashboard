import {
  Body,
  Get,
  Param,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserInput, UpdateUserSchema } from './dto/update-user.dto';
import { ZodValidationPipe } from 'src/common/pipes/ZodValidationPipes';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ZodValidationPipe(UpdateUserSchema))
  updateUser(@Req() req: Request, @Body() userData: UpdateUserInput) {
    const user = req.user as { id: number };
    if (!user || typeof user.id !== 'number') {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.userService.updateUser(user.id, userData);
  }
}
