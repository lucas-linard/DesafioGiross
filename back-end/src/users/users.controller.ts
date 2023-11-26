import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { userDTO } from 'src/DTOs/user.DTO';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  create(@Body() userDto: userDTO) {
    return this.usersService.create(userDto);
  }
}
