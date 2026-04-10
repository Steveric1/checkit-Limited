import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GrpcToHttpExceptionFilter } from '@app/common';
import { GrpcValidationPipe } from '@app/common/utility/grpc-validation-pipe.utility';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GrpcToHttpExceptionFilter());
  app.useGlobalPipes(new GrpcValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
