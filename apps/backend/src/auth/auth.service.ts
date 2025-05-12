import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';
import { UserInput } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);

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
    const decoded: { sub: string; email: string } =
      await this.jwtService.verify(token);

    if (!decoded) {
      throw new Error('Invalid token');
      return null;
    }
    const user = await this.prisma.user.findUnique({
      where: { email: decoded.email },
    });
    if (!user) {
      throw new Error('User not found');
      return null;
    }

    return true;
  }
}
