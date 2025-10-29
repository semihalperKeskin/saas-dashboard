import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/common/pipes/ZodValidationPipes';
import { AuthSchema, AuthInput } from './dto/auth.dto';
import { RegisterInput, RegisterSchema } from './dto/register.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ZodValidationPipe(AuthSchema))
  async login(
    @Body() data: AuthInput,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token } = await this.authService.login(data);

    response.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    });

    return true;
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  async register(@Body() data: RegisterInput) {
    return this.authService.register(data);
  }

  @Post('validation')
  async validation(@Req() req: Request) {
    const token = req.cookies['token'] as string;

    if (!token) {
      throw new UnauthorizedException('Missing authentication token');
    }

    return this.authService.validation(token);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const token = req.cookies['token'] as string;

    if (!token) {
      throw new UnauthorizedException('Missing authentication token');
    }

    await this.authService.logout(token);

    res.clearCookie('token');

    return true;
  }
}
