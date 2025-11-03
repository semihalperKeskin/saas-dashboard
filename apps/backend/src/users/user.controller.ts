import {
  Body,
  Get,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Req() req: Request) {
    const user = req.user as { id: number; username: string } | undefined;

    if (!user || typeof user.id !== 'number') {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.userService.findOne(user.id);
  }

  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  updateUser(@Req() req: Request, @Body() userData: UpdateUserInput) {
    const user = req.user as { id: number; username: string } | undefined;

    if (!user || typeof user.id !== 'number') {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.userService.updateUser(user.id, userData);
  }
}
