import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from './common/pipes/ZodValidationPipes';
import { UserSchema } from './auth/dto/user.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const schema = UserSchema;
  app.useGlobalPipes(new ZodValidationPipe(schema));
  await app.listen(3000);
}
void bootstrap();
