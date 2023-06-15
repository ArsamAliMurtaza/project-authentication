// auth.controller.ts

import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(
    @Body(ValidationPipe) registerDto: RegisterDto,
  ): Promise<void> {
    await this.authService.register(registerDto);
  }

  @Post('/login')
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Post('/logout')
  @UseGuards(AuthGuard())
  async logout(): Promise<void> {
    // Logout logic
  }
}
