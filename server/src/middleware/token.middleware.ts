import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    private readonly logger = new Logger(TokenMiddleware.name);
    constructor(
        @InjectRedis() private readonly redis: Redis,
        private readonly jwtService: JwtService,
    ){}

    async use(req: Request, res: Response, next: NextFunction) {
        this.logger.debug("hello middle ware");
        // const test = await this.redis.get("hello");
        // console.log(test);
        next();
    }
}
