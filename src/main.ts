import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config } from 'dotenv';

async function bootstrap() {
  config(); // load environment variables from .env file
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
