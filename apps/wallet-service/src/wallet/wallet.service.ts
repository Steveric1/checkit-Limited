import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateWalletDto,
  GetWalletDto,
  CreditWalletDto,
  DebitWalletDto,
  WalletResponse,
  UserServiceClient,
  USER_SERVICE_NAME,
  GetUserByIdResponse
} from '@app/common';
import { WalletPrismaService } from '../wallet-prisma-service';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices/exceptions/rpc-exception';
import { Prisma } from 'apps/wallet-service/prisma/generated/wallet-client';
import { lastValueFrom } from 'rxjs';
import { USER_SERVICE } from 'apps/user-service/src/users/constants';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class WalletService implements OnModuleInit {
  private userService!: UserServiceClient;

  constructor(
    private readonly walletPrisma: WalletPrismaService,
    @Inject(USER_SERVICE) private readonly client: ClientGrpc
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async createWallet(createWalletDto: CreateWalletDto): Promise<WalletResponse> {
    // check if user exist
    let user: GetUserByIdResponse;

    try {
      user = await lastValueFrom(this.userService.getUserById({ id: createWalletDto.userId }));
    } catch (error) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User service error',
      });
    }

    if (!user?.data?.id) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User not found',
      });
    }

    const userId = user.data.id;

    // check if wallet exist for user
    const existingWallet = await this.walletPrisma.wallet.findFirst({
      where: { userId },
    });

    if (existingWallet) {
      return {
        status: 'success',
        message: 'Wallet created successfully',
        data: {
          ...existingWallet,
          balance: existingWallet.balance.toString(),
        },
      };
    }

    const wallet = await this.walletPrisma.wallet.create({
      data: {
        userId: createWalletDto.userId
      },
    });

    return {
      status: 'success',
      message: 'Wallet created successfully',
      data: {
        ...wallet,
        balance: wallet.balance.toString(),
      },
    };
  }

  async getWallet(getWalletDto: GetWalletDto): Promise<WalletResponse> {
    const { id } = getWalletDto;
    const wallet = await this.walletPrisma.wallet.findUnique({
      where: { id },
    });

    if (!wallet) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `Wallet with id ${id} not found`,
      });
    }

    return {
      status: 'success',
      message: 'Wallet retrieved successfully',
      data: {
        ...wallet,
        balance: wallet.balance.toString(),
      },
    };
  }

  async creditWallet(creditWalletDto: CreditWalletDto): Promise<WalletResponse> {
    // extract data from creditwalletDto
    const { walletId, userId, amount } = creditWalletDto;
    const parsedAmount = new Prisma.Decimal(amount);

    if (parsedAmount.lte(0)) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'Amount must be greater than zero',
      });
    }
    
    const wallet = await this.walletPrisma.wallet.findFirst({
      where: { id: walletId, userId },
    });

    if (!wallet) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `Wallet with id ${walletId} not found`,
      });
    }

    const updatedWallet = await this.walletPrisma.wallet.update({
      where: { id: walletId },
      data: {
        balance: { increment: parsedAmount },
      },
    });

    return {
      status: 'success',
      message: 'Wallet credited successfully',
      data: {
        ...updatedWallet,
        balance: updatedWallet.balance.toString(),
      },
    }
  }

  async debitWallet(debitWalletDto: DebitWalletDto): Promise<WalletResponse> {
    const { walletId, userId, amount } = debitWalletDto;
    const parsedAmount = new Prisma.Decimal(amount);

    if (parsedAmount.lte(0)) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'Amount must be greater than zero',
      });
    }

    const wallet = await this.walletPrisma.wallet.findFirst({
        where: { id: walletId, userId },
    });
    
    if (!wallet) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `Wallet with id ${walletId} not found`,
      });
    }

    if (wallet.balance.lt(parsedAmount)) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'Insufficient balance',
      });
    }

    const debitWallet = await this.walletPrisma.$transaction(async (prisma) => {
      const updatedWallet = await prisma.wallet.update({
        where: { id: walletId },
        data: {
          balance: { decrement: parsedAmount },
        },
      });

      return updatedWallet;
    });

    return {
      status: 'success',
      message: 'Wallet debited successfully',
        data: {
          ...debitWallet,
          balance: debitWallet.balance.toString(),
        },
    }
  }
}
