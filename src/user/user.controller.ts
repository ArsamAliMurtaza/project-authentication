// users.controller.ts

import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
