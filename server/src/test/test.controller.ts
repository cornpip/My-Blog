import { Public } from '@/decorator/public.decorator';
import { PostService } from '@/post/service/post.service';
import { Controller ,Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
    constructor(
        private readonly testService: TestService,
    ){}

    @Public()
    @Get('/dd')
    test(){
        this.testService.countup();
        this.testService.getcount();
        return
    }

    @Public()
    @Get("/tt")
    async testRedis(){
        return `tt`;
    }
}
