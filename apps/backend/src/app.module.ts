import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './users/user.module';
import { PrismaService } from 'prisma/prisma.service';
import { ColumnModule } from './column';
import { TaskModule } from './task';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, ColumnModule, TaskModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
