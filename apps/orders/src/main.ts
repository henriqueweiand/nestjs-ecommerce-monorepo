import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();