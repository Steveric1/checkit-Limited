import { Controller, Param, Post, Get, Body } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { WalletService } from './wallet.service';
import {
  DebitWalletValidatorDto,
  CreditWalletValidatorDto,
  GetWalletVAlidatorDto,
  CreateWalletValidatorDto,
} from '@app/common';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('create-wallet/:userId')
  createWallet(@Param('userId') userId: string) {
    const createWalletDto: CreateWalletValidatorDto = { userId };
    return lastValueFrom(this.walletService.createWallet(createWalletDto));
  }

  @Get('get-wallet/:id')
  getWallet(@Param('id') id: string) {
    const getWalletDto: GetWalletVAlidatorDto = { id };
    return lastValueFrom(this.walletService.getWallet(getWalletDto));
  }

  @Post('credit-wallet')
  creditWallet(@Body() creditWalletDto: CreditWalletValidatorDto) {
    return lastValueFrom(this.walletService.creditWallet(creditWalletDto));
  }

  @Post('debit-wallet')
  debitWallet(@Body() debitWalletDto: DebitWalletValidatorDto) {
    return lastValueFrom(this.walletService.debitWallet(debitWalletDto));
  }
}
