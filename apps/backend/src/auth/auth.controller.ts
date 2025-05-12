import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInput, UserSchema } from 'src/auth/dto/user.dto';
import { ZodValidationPipe } from 'src/common/pipes/ZodValidationPipes';
import { z } from 'zod';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ZodValidationPipe(UserSchema))
  async login(@Body() body: z.infer<typeof UserSchema>) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(UserSchema))
  async register(@Body() body: UserInput) {
    return this.authService.register(body);
  }

  @Post('validate-token')
  async validateToken(@Req() req: Request) {
    const authHeader = req.headers['authorization'] as string | undefined;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token not provided');
    }

    const token = authHeader.split(' ')[1].replace(/^"|"$/g, '');

    return this.authService.validateToken(token);
  }
}
