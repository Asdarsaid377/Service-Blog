import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local.auth.guard';

@Controller()
export class AppController {
  @Get('/')
  async home() {
    return 'Welcome Home';
  }
}
