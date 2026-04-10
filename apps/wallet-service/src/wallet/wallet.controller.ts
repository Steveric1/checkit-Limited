import {
  WalletServiceController,
  WalletServiceControllerMethods,
  DebitWalletDto,
  CreditWalletDto,
  GetWalletDto,
  CreateWalletDto,
} from '@app/common';
import { Controller } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
@WalletServiceControllerMethods()
export class WalletController implements WalletServiceController {
  constructor(private readonly walletService: WalletService) {}

  async createWallet(createWalletDto: CreateWalletDto) {
    return await this.walletService.createWallet(createWalletDto);
  }

  async getWallet(getWalletDto: GetWalletDto) {
    return await this.walletService.getWallet(getWalletDto);
  }

  async creditWallet(creditWalletDto: CreditWalletDto) {
    return await this.walletService.creditWallet(creditWalletDto);
  }

  async debitWallet(debitWalletDto: DebitWalletDto) {
    return await this.walletService.debitWallet(debitWalletDto);
  }
}
