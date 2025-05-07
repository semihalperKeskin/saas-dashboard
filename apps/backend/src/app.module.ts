import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UserService } from './users/user.service';
import { UserController } from './users/user.controller';
import { UserModule } from './users/user.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
