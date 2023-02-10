import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { LocalAuthGuard } from './auth/guard/local_auth.guard';
import { AuthService } from './auth/auth.service';
import { User } from './user/entities/user.entity';
import { JwtAuthGuard } from './auth/guard/jwt_auth.guard';
import { Public } from './decorator/public.decorator';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    ) {}
  
  @Public()
  @Get()
  getHello(): string {
    // console.log(process.env.TOKEN_SECRET);
    return this.appService.getHello();
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req: Request){
    // console.log(req.body);
    // console.log({...req.user});
    // console.log(req.user);
    const object_user: any = {...req.user}
    const req_user_dto: User = {...object_user};
    return this.authService.login(req_user_dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async profile(@Req() req: Request){
    console.log(req.user);
    return;
  }
}
