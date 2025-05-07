import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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

    return true;
  }

  async register(UserDto: UserDto) {
    const hashedPassword = await bcrypt.hash(UserDto.password, 10);

    const userExists = await this.prisma.user.findUnique({
      where: { email: UserDto.email },
    });
    if (userExists) {
      throw new Error('User already exists');
    }

    const user = await this.prisma.user.create({
      data: {
        name: UserDto.name ?? 'VisionBoard User',
        organization: UserDto.organization ?? '',
        username: UserDto.username,
        job: UserDto.job ?? '',
        location: UserDto.location ?? '',
        email: UserDto.email,
        password: hashedPassword,
      },
    });

    return user;
  }
}
