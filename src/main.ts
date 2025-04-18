import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicrosrvExceptionFilter } from './common/exceptions/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get<number>('app.port') ?? 3000;

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new MicrosrvExceptionFilter());

  await app.listen(port);

  const logger = new Logger('boostrap');
  logger.log(`Gateway is listening on port ${port}`);
}
bootstrap();
