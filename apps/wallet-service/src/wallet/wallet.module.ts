import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletPrismaService } from '../wallet-prisma-service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE } from 'apps/user-service/src/users/constants';
import { USER_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: USER_PACKAGE_NAME,
          protoPath: join(process.cwd(), 'packages/proto/user.proto'),
          url: 'localhost:5000',
        },
      },
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService, WalletPrismaService],
  exports: [WalletService]
})
export class WalletModule {}
