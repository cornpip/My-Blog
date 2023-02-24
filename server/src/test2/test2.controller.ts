import { Public } from '@/decorator/public.decorator';
import { Controller, Get } from '@nestjs/common';
import { Test2Service } from './test2.service';

@Controller('test2')
export class Test2Controller {
    constructor(
        private readonly test2Service: Test2Service
    ){}

    @Public()
    @Get()
    async one(){
        this.test2Service.hello2();
        return;
    }
}
