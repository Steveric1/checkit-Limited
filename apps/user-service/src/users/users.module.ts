import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserPrismaService } from '../prisma-service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UserPrismaService],
})
export class UsersModule {}
