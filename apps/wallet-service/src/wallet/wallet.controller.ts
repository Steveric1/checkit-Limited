import {
  WalletServiceController,
  WalletServiceControllerMethods,
  DebitWalletValidatorDto,
  CreditWalletValidatorDto,
  GetWalletVAlidatorDto,
  CreateWalletValidatorDto,
} from '@app/common';
import { Controller } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller()
@WalletServiceControllerMethods()
export class WalletController implements WalletServiceController {
  constructor(private readonly walletService: WalletService) {}

  async createWallet(createWalletDto: CreateWalletValidatorDto) {
    return await this.walletService.createWallet(createWalletDto);
  }

  async getWallet(getWalletDto: GetWalletVAlidatorDto) {
    return await this.walletService.getWallet(getWalletDto);
  }

  async creditWallet(creditWalletDto: CreditWalletValidatorDto) {
    return await this.walletService.creditWallet(creditWalletDto);
  }

  async debitWallet(debitWalletDto: DebitWalletValidatorDto) {
    return await this.walletService.debitWallet(debitWalletDto);
  }
}
