import { WalletServiceClient } from '@app/common/types/wallet';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { WALLET_SERVICE } from 'apps/wallet-service/src/wallet/constants';
import { WALLET_SERVICE_NAME } from 'packages/proto/wallet';
import {
  DebitWalletDto,
  CreditWalletDto,
  GetWalletDto,
  CreateWalletDto,
} from '@app/common';

@Injectable()
export class WalletService implements OnModuleInit {
  private walletService!: WalletServiceClient;

  constructor(@Inject(WALLET_SERVICE) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.walletService = this.client.getService<WalletServiceClient>(WALLET_SERVICE_NAME);
  }

  createWallet(createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(createWalletDto);
  }

  getWallet(getWalletDto: GetWalletDto) {
    return this.walletService.getWallet(getWalletDto);
  }

  creditWallet(creditWalletDto: CreditWalletDto) {
    return this.walletService.creditWallet(creditWalletDto);
  }

  debitWallet(debitWalletDto: DebitWalletDto) {
    return this.walletService.debitWallet(debitWalletDto);
  }

}
