import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  GetUserByIdDto,
  CreateUserResponse,
  GetUserByIdResponse,
} from '@app/common';
import { RpcException } from '@nestjs/microservices';
import { UserPrismaService } from '../prisma-service';
import { status } from '@grpc/grpc-js';

@Injectable()
export class UsersService {
  constructor(private readonly userPrisma: UserPrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    const existingUser = await this.userPrisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new RpcException({
        code: status.ALREADY_EXISTS,
        message: `User with email ${createUserDto.email} already exists`,
      });
    }

    // create new user
    const newUser = await this.userPrisma.user.create({
      data: {
        ...createUserDto,
      },
    });

    return {
      status: 'success',
      message: "User created successfully",
      data: newUser,
    }
  }

  async findOne(getUserByIdDto: GetUserByIdDto): Promise<GetUserByIdResponse> {
    const user = await this.userPrisma.user.findUnique({
      where: { id: getUserByIdDto.id },
    });

    if (!user) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: `User with id ${getUserByIdDto.id} not found`,
      });
    }

    return {
      status: 'success',
      message: 'User retrieved successfully',
      data: user,
    }
  }
}
