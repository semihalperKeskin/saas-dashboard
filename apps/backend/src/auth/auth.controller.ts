import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInput, UserSchema } from 'src/auth/dto/user.dto';
import { ZodValidationPipe } from 'src/common/pipes/ZodValidationPipes';
import { z } from 'zod';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @UsePipes(new ZodValidationPipe(UserSchema))
  async login(@Body() body: z.infer<typeof UserSchema>) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(UserSchema))
  async register(@Body() body: UserInput) {
    return this.authService.register(body);
  }
}
