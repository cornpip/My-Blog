import { AuthService } from '@/auth/auth.service';
import { JwtDecode } from '@/jwt/jwt-decode.interface';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { HttpException, HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    private readonly logger = new Logger(TokenMiddleware.name);
    constructor(
        @InjectRedis() private readonly redis: Redis,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        this.logger.debug("Token middleware");
        const access_token: string | undefined = req.cookies['access_token'];
        const refresh_token: string | undefined = req.cookies['refresh_token'];
        // 일단 acc는 redis랑 비교안하고 refresh만 비교하자
        // redis랑 비교 목적: 맞는 key로 임의로 자기들이 token을 만들어 요청하는 행위를 막으려고
        if (!access_token) return next();
        try {
            const access_data: JwtDecode = await this.authService.getTokenData(access_token, this.configService.get("auth.acc_token_secret"));
            const expire_time: number = Math.floor(Date.now() / 1000) - access_data.exp;
            console.log(expire_time);
            if (expire_time >= 0) throw new Error("expired acc_token");
        } catch (e) {
            try {
                if (!refresh_token) return next();
                const refresh_data: JwtDecode = await this.authService.getTokenData(refresh_token, this.configService.get("auth.ref_token_secret"));
                const expire_time: number = Math.floor(Date.now() / 1000) - refresh_data.exp;
                const pass = await this.authService.validateToken(refresh_data.userId, refresh_token, 2);
                if (!pass) throw new Error("faked token");
                if (expire_time < 0) {
                    const re_access_token = await this.authService.refresh({
                        userId: refresh_data.userId,
                        email: refresh_data.email,
                    });
                    req.cookies["access_token"] = re_access_token;
                    res.cookie("access_token", re_access_token, { httpOnly: true });
                } else throw new Error("expired ref_token"); 
            } catch (e) {
                throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
            }
        }
        //ref가 없는 또는 만료된 최종경우는 다시 로그인하도록 안내돼야함.
        return next();
    }
}
