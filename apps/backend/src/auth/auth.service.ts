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
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async decodeAndFindUser(token: string) {
    let decoded: { sub: string; email: string; type: string };

    try {
      decoded = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.refreshSecret,
      });
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

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!data.password) {
      throw new UnauthorizedException('Password is required');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const refreshTokenPayload = {
      sub: user.id,
      email: user.email,
      type: 'refresh',
    };

    const refreshToken: string = this.jwtService.sign(refreshTokenPayload, {
      expiresIn: '7d',
      secret: jwtConstants.refreshSecret,
    });

    const accessTokenPayload = {
      sub: user.id,
      username: user.username,
      type: 'access',
    };

    const accessToken: string = this.jwtService.sign(accessTokenPayload);

    if (!refreshToken || !accessToken) {
      throw new UnauthorizedException('Failed to create refresh token');
    }

    const tokenData = await this.prisma.userToken.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    if (!tokenData) {
      throw new UnauthorizedException('Failed to create token');
    }

    return { refreshToken, accessToken };
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

  async generateAccessToken(user: { id: number; email: string }) {
    const payload = { sub: user.id, email: user.email, type: 'access' };
    return this.jwtService.signAsync(payload);
  }

  async logout(refreshToken: string) {
    const { user } = await this.decodeAndFindUser(refreshToken);
    const refreshTokenData = await this.findUserToken(user.id);

    await this.prisma.userToken.delete({
      where: { id: refreshTokenData.id },
    });

    return true;
  }
}
