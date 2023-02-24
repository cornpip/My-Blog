import { Public } from '@/decorator/public.decorator';
import { TestService } from '@/test/test.service';
import { Test2Service } from '@/test2/test2.service';
import { CheckUserDto } from '@/user/dto/check_user.dto';
import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly authService: AuthService,
        private readonly testService: TestService,
        // private test2Service: Test2Service,
    ){}

    @Post("/tt")
    async test(@Body() check_user_dto: CheckUserDto){
        try{
            await this.authService.validateUser(check_user_dto);
        }catch(err){
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return `success check user`;
    }

    @Public()
    @Get("/test2")
    async test2(){
        this.testService.countup();
        this.testService.getcount();
        return;
    }

    // @Public()
    // @Get("/test3")
    // async test3(){
    //     this.test2Service.hello2();
    //     return;
    // }
}
