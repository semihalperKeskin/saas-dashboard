import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';
import { UserInput } from './dto/user.dto';

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
        name: userDto.name,
        organization: userDto.organization ?? '',
        job: userDto.job ?? '',
        location: userDto.location ?? '',
        email: userDto.email,
        password: hashedPassword,
      },
    });

    return user;
  }
}
