import { Controller, Param, Post, Get, Body } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { WalletService } from './wallet.service';
import {
  DebitWalletDto,
  CreditWalletDto,
  GetWalletDto,
  CreateWalletDto,
} from '@app/common';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('create-wallet/:userId')
  createWallet(@Param('userId') userId: string) {
    const createWalletDto: CreateWalletDto = { userId };
    return lastValueFrom(this.walletService.createWallet(createWalletDto));
  }

  @Get('get-wallet/:id')
  getWallet(@Param('id') id: string) {
    const getWalletDto: GetWalletDto = { id };
    return lastValueFrom(this.walletService.getWallet(getWalletDto));
  }

  @Post('credit-wallet')
  creditWallet(@Body() creditWalletDto: CreditWalletDto) {
    return lastValueFrom(this.walletService.creditWallet(creditWalletDto));
  }

  @Post('debit-wallet')
  debitWallet(@Body() debitWalletDto: DebitWalletDto) {
    return lastValueFrom(this.walletService.debitWallet(debitWalletDto));
  }
}
