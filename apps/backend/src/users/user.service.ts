import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  private prisma = new PrismaClient();

  findAll() {
    return this.prisma.user.findMany();
  }
  findOne(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  update(userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        name: 'Updated Name',
      },
    });
  }
}
