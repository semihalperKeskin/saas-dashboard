import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
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
