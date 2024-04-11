import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configSwagger } from './application/configs/api-docs.config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    appOptions,
  );

  app.useGlobalPipes(new ValidationPipe());

  configSwagger(app);
  await app.listen(3000);
}
bootstrap();
