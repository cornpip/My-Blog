import { Public } from '@/decorator/public.decorator';
import { CheckUserDto } from '@/user/dto/check_user.dto';
import { CreateUserDto } from '@/user/dto/create_user.dto';
import { User } from '@/user/entities/user.entity';
import { UserService } from '@/user/service/user.service';
import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local_auth.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Post("/tt")
    @Public()
    async test(@Body() check_user_dto: CheckUserDto) {
        try {
            await this.authService.validateUser(check_user_dto);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        // return `success check user`;
        return { success: "good" };
    }

    @Public()
    @Post("/signup")
    async signup(@Body() create_user_dto: CreateUserDto) {
        this.logger.debug("sing_up hello");
        try {
            await this.userService.signup(create_user_dto);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.CONFLICT);
        }
        return `success sign up`;
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        // console.log("!!!", req.cookies);
        const object_user: any = { ...req.user };
        const req_user_dto: User = { ...object_user };
        const { access_token, refresh_token } = await this.authService.login(req_user_dto);
        await this.authService.setTokenCookie(res, { acc: access_token, ref: refresh_token });
        return req_user_dto;
    }

    @Get("logout")
    async logout(
        @Res({ passthrough: true }) res: Response,
    ) {
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        return true;
    }

    @Get("check")
    async check() {
        return true;
    }
}
