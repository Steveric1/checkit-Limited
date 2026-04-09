import { NestFactory } from '@nestjs/core';
import { WalletServiceModule } from './wallet-service.module';
import { WALLET_PACKAGE_NAME } from '@app/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WalletServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(process.cwd(), 'packages/proto/wallet.proto'),
        package: WALLET_PACKAGE_NAME,
        url: 'localhost:5001',
      },
    },
  );
  
  await app.listen();
}
bootstrap();
