import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from '@app/common';
import { GrpcValidationPipe } from '@app/common/utility/grpc-validation-pipe.utility';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(process.cwd(), 'packages/proto/user.proto'),
        package: USER_PACKAGE_NAME,
        url: 'localhost:5000',
      },
    },
  );

  app.useGlobalPipes(new GrpcValidationPipe());

  await app.listen();

}
bootstrap();
