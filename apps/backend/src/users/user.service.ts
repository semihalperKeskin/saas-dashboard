import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserInput } from './dto/update-user.dto';

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

  updateUser(id: number, userData: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id: id },
      data: {
        ...userData,
      },
    });
  }
}
