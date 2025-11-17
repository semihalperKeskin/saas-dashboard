import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/common/pipes/ZodValidationPipes';
import { AuthSchema, AuthInput } from './dto/auth.dto';
import { RegisterInput, RegisterSchema } from './dto/register.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ZodValidationPipe(AuthSchema))
  async login(
    @Body() data: AuthInput,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken, accessToken } = await this.authService.login(data);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    });

    return { accessToken };
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  async register(@Body() data: RegisterInput) {
    return this.authService.register(data);
  }

  @Post('validation')
  @UseGuards(AuthGuard('jwt'))
  validation() {
    return { isValid: true };
  }
  @Get('refresh-token')
  @UseGuards(AuthGuard('jwt'))
  async refreshToken(@Req() req: Request) {
    const user = req.user as { id: number; email: string } | undefined;
    if (!user) {
      throw new UnauthorizedException('User not found in request');
    }
    const accessToken = await this.authService.generateAccessToken(user);
    return { accessToken };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const token = req.cookies['refreshToken'] as string;

    if (!token) {
      throw new UnauthorizedException('Missing authentication token');
    }

    await this.authService.logout(token);

    res.clearCookie('refreshToken');

    return true;
  }
}
