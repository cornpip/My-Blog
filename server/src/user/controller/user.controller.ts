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
}
