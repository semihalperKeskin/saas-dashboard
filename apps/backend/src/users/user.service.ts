import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findOne(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        username: true,
        organization: true,
        job: true,
        email: true,
        createdAt: true,
      },
    });
  }

  updateUser(userId: number, userData: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...userData,
      },
    });
  }
}
