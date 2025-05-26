import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInput } from 'src/auth/dto/user.dto';
import { ZodValidationPipe } from 'src/common/pipes/ZodValidationPipes';
import { AuthInput, AuthSchema } from '@vizionboard/validation';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ZodValidationPipe(AuthSchema))
  async login(@Body() data: AuthInput) {
    return this.authService.login(data);
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(AuthSchema))
  async register(@Body() body: UserInput) {
    return this.authService.register(body);
  }

  @Post('validation')
  async validation(@Req() req: Request) {
    const authHeader = req.headers['authorization'] as string | undefined;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token not provided');
    }

    const token = authHeader.split(' ')[1].replace(/^"|"$/g, '');

    return this.authService.validation(token);
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    const authHeader = req.headers['authorization'] as string | undefined;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token not provided');
    }

    const token = authHeader.split(' ')[1].replace(/^"|"$/g, '');

    return this.authService.logout(token);
  }
}
