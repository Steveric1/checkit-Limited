import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WALLET_SERVICE } from 'apps/wallet-service/src/wallet/constants';
import { WALLET_PACKAGE_NAME } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: WALLET_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: WALLET_PACKAGE_NAME,
          protoPath: join(process.cwd(), 'packages/proto/wallet.proto'),
        },
      },
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
