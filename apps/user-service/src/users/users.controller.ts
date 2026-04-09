import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UserServiceController,
  CreateUserDto,
  GetUserByIdDto,
  UserServiceControllerMethods,
} from '@app/common';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async getUserById(getUserByIdDto: GetUserByIdDto) {
    return await this.usersService.findOne(getUserByIdDto);
  }
}
