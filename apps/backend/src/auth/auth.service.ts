import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';
import { UserInput } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthInput } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: AuthInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);

    const tokenData = await this.prisma.userToken.create({
      data: {
        userId: user.id,
        token,
      },
    });
    if (!tokenData) {
      throw new UnauthorizedException('Failed to create token');
    }

    return {
      access_token: token,
    };
  }

  async register(userDto: UserInput) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: userDto.email },
    });
    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: userDto.username,
        name: userDto.name ?? '',
        organization: userDto.organization ?? '',
        job: userDto.job ?? '',
        location: userDto.location ?? '',
        email: userDto.email,
        password: hashedPassword,
      },
    });

    return user;
  }

  async validateToken(token: string) {
    let decoded: { sub: string; email: string };

    try {
      decoded = await this.jwtService.verify(token);
    } catch (err) {
      console.error('JWT verify error:', err);
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tokenData = await this.prisma.userToken.findFirst({
      where: { userId: user.id },
    });

    if (!tokenData) {
      throw new UnauthorizedException('Token not found');
    }

    return true;
  }
}
