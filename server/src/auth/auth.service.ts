import { CheckUserDto } from '@/user/dto/check_user.dto';
import { UserService } from '@/user/service/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
import { User } from '@/user/entities/user.entity';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';

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
        const payload = { email: user.email, sub: user.id };
        const [acc_token, ref_token] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get("auth.acc_token_secret"),
                expiresIn: "900s"
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get("auth.ref_token_secret"),
                expiresIn: "43200",
            })
        ]);
        const total_token = `${acc_token},${ref_token}`; // 쉼표는 base64url에 없음
        await this.redis.set(user.id.toString(), total_token, "EX", 10);
        return {
            access_token: acc_token,
            refresh_token: ref_token,
        };
    }

    async setTokenCookie(
        res: Response,
        token: { acc: string, ref: string }
    ) {
        res.cookie("access_token", token.acc, { httpOnly: true });
        res.cookie("refresh_token", token.ref, { httpOnly: true });
        return;
    }

    async getToken(req: Request){
        
        return;
    }
}
