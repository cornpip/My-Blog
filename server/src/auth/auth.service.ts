import { CheckUserDto } from '@/user/dto/check_user.dto';
import { UserService } from '@/user/service/user.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
import { User } from '@/user/entities/user.entity';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';
import { JwtPayload } from '@/jwt/jwt.interface';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
        @InjectRedis() private readonly redis: Redis,
    ) { }

    async validateUser(check_user_dto: CheckUserDto) {
        const db_user = await this.userService.checkUser(check_user_dto);
        if (db_user.length === 0) throw new Error("not exist user");
        const res = await argon2.verify(db_user[0].password, check_user_dto.password);
        if (!res) throw new Error("wrong password");
        return db_user[0];
    }

    async login(user: User) {
        // const payload = { email: user.email, sub: user.id };
        const payload: JwtPayload = { userId: user.id, email: user.email };
        const [acc_token, ref_token] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get("auth.acc_token_secret"),
                expiresIn: this.configService.get("auth.acc_expire_time")
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get("auth.ref_token_secret"),
                expiresIn: this.configService.get("auth.ref_expire_time"),
            })
        ]);
        const total_token = `${acc_token},${ref_token}`; // 쉼표는 base64url에 없음
        await this.redis.set(user.id.toString(), total_token, "EX", this.configService.get("auth.redis_expire_time"));
        return {
            access_token: acc_token,
            refresh_token: ref_token,
        };
    }

    async setTokenCookie(
        res: Response,
        token: { acc: string, ref: string }
    ) {
        res.cookie("access_token", token.acc, { httpOnly: true, sameSite:"none", secure:true });
        res.cookie("refresh_token", token.ref, { httpOnly: true, sameSite:"none", secure:true });
        return;
    }

    async getTokenData(token: string, secretkey: string) {
        try {
            const token_data = await this.jwtService.verifyAsync(token, { secret: secretkey });
            return token_data;
        } catch (e) {
            throw new Error("token expiration");
        }
    }

    async refresh(payload: JwtPayload) {
        const new_token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get("auth.acc_token_secret"),
            expiresIn: this.configService.get("auth.acc_expire_time")
        });
        return new_token;
    }

    /**
     * 
     * @param userId 
     * @param token 
     * @param flag access token validate=1, refresh token validate=2
     * @returns success=true, fail=false
     */
    async validateToken(userId: number, token: string, flag: number){
        const total_token = await this.redis.get(`${userId}`);
        const [acc_token, ref_token] = total_token.split(",");
        if(flag === 1) return token == acc_token;
        else if(flag === 2) return token == ref_token;
        throw new Error("validateToken function not working");
    }
}
