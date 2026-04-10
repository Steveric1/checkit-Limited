import { Body, Post, Get, Param, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserValidatorDto,
  GetUserByIdValidatorDto,
} from '@app/common';
import { lastValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  createUser(@Body() createUserDto: CreateUserValidatorDto) {
    return lastValueFrom(this.userService.create(createUserDto));
  }

  @Get('get-user-by-id/:id')    
  getUserById(@Param('id') id: string) {
    const getUserByIdDto: GetUserByIdValidatorDto = { id };
    return lastValueFrom(this.userService.getUserById(getUserByIdDto));
  }
}
