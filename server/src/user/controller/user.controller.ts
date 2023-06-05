import { Public } from '@/decorator/public.decorator';
import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create_user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(
        private readonly userService: UserService
    ){}

    @Get("/posts")
    async findPosts(){
        return this.userService.findPosts();
    }
}
