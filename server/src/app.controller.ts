import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
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
  ) { }

  @Public()
  @Get()
  getHello(): string {
    console.log("test router");
    return this.appService.getHello();
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
    @Req() req: Request,
    @Res({passthrough: true}) res: Response,
  ) {
    // console.log("!!!", req.cookies);
    const object_user: any = { ...req.user };
    const req_user_dto: User = { ...object_user };
    const { access_token, refresh_token } = await this.authService.login(req_user_dto);
    await this.authService.setTokenCookie(res, {acc: access_token, ref: refresh_token});
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async profile(@Req() req: Request) {
    return;
  }
}
