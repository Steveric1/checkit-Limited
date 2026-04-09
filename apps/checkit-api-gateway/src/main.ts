import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GrpcToHttpExceptionFilter } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GrpcToHttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
