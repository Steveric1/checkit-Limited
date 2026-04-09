import { USER_SERVICE_NAME, UserServiceClient } from '@app/common/types/user';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { USER_SERVICE } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateUserDto,
  GetUserByIdDto,
} from '@app/common';

@Injectable()
export class UserService implements OnModuleInit {
  private userService!: UserServiceClient;

  constructor(
    @Inject(USER_SERVICE) private client: ClientGrpc
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  create(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  getUserById(getUserByIdDto: GetUserByIdDto) {
    return this.userService.getUserById(getUserByIdDto);
  }
}
