import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UserServiceController,
  CreateUserValidatorDto,
  GetUserByIdValidatorDto,
  UserServiceControllerMethods,
} from '@app/common';

@Controller()
@UserServiceControllerMethods()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}

  async createUser(createUserDto: CreateUserValidatorDto) {
    return await this.usersService.create(createUserDto);
  }

  async getUserById(getUserByIdDto: GetUserByIdValidatorDto) {
    return await this.usersService.findOne(getUserByIdDto);
  }
}
