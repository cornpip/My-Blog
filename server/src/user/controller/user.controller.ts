import { Public } from '@/decorator/public.decorator';
import { Body, Controller, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create_user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(
        private readonly userService: UserService
    ){}

    @Public()
    @Post("/signup")
    async signup(@Body() create_user_dto: CreateUserDto){
        this.logger.debug("sing_up hello");
        try{
            await this.userService.signup(create_user_dto);
        }catch(err){
            throw new HttpException(err.message, HttpStatus.CONFLICT);
        }
        return `success sign up`;
    }
}
