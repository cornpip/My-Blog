import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class Test2Service {
    private readonly logger = new Logger(Test2Service.name);
    count: number;
    constructor(){
        this.count = 0;
    }
    async hello2(){
        this.logger.debug("hello my name is test2Service");
        this.count++;
        console.log(this.count);
        return;
    }
}
