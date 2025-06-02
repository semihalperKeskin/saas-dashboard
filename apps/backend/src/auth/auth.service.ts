import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';
import { AuthInput } from './dto/auth.dto';
import { RegisterInput } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async decodeAndFindUser(token: string) {
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

    return { user, decoded };
  }

  private async findUserToken(userId: number) {
    const tokenData = await this.prisma.userToken.findFirst({
      where: { userId: userId },
    });

    if (!tokenData) {
      throw new UnauthorizedException('Token not found');
    }

    return tokenData;
  }

  async login(data: AuthInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!data.password) {
      throw new UnauthorizedException('Password is required');
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

  async register(data: RegisterInput) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: data.username ?? '',
        name: data.name ?? '',
        organization: data.organization ?? '',
        job: data.job ?? '',
        location: data.location ?? '',
        email: data.email,
        password: hashedPassword,
      },
    });

    return user;
  }

  async logout(token: string) {
    const { user } = await this.decodeAndFindUser(token);
    const tokenData = await this.findUserToken(user.id);

    await this.prisma.userToken.delete({
      where: { id: tokenData.id },
    });

    return true;
  }

  async validation(token: string) {
    const { user } = await this.decodeAndFindUser(token);
    await this.findUserToken(user.id);

    return user;
  }
}
