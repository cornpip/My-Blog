import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class TestService {
    count: number;
    constructor(){
        this.count = 0;
    }

    countup(){
        this.count++;
    }

    getcount(){
        console.log(this.count);
        return this.count;
    }

    hello(){
        console.log("hello");
        return 'hello'
    }
}
