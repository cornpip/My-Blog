import { Controller, Get, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './auth/guard/local_auth.guard';
import { AuthService } from './auth/auth.service';
import { User } from './user/entities/user.entity';
import { JwtAuthGuard } from './auth/guard/jwt_auth.guard';
import { Public } from './decorator/public.decorator';

@Controller('api')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) { }

  @Public()
  @Get()
  getHello(): string {
    this.logger.debug("test router");
    return this.appService.getHello();
  }

  @Get("profile")
  async profile(@Req() req: Request) {
    return;
  }
}
