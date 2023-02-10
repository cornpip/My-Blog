import { CheckUserDto } from '@/user/dto/check_user.dto';
import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly authService: AuthService,
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
}
