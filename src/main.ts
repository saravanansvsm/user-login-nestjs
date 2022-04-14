/* eslint-disable @typescript-eslint/no-var-requires */
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Environment } from './common/contants/env-setup';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

require('dotenv').config();

if (Object.values(Environment).includes(process.env.Development as any)) {
  console.log(`Running ${process.env.Development} Environment`);
} else {
  console.log(`Running Local Environment`);
  process.env.NODE_ENV = 'LOCAL';
}

if (process.env.Development == undefined) {
  process.env.Development = 'LOCAL';
}

require('dotenv').config();

const port = process.env.PORT;

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(port, () => {
    console.log(`Server started running on http://localhost:${port}`);
  });
}

bootstrap();
