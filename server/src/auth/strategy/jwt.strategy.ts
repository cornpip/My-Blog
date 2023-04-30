
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtDecode } from '@/jwt/jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);
    constructor(private configService: ConfigService) {
        super({
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // jwtFromRequest: ExtractJwt.fromHeader("token"),
            jwtFromRequest: (req: Request)=>{
                this.logger.debug("JWT Auth");
                return req.cookies["access_token"];
            },
            ignoreExpiration: false,
            secretOrKey: configService.get("auth.acc_token_secret"),
        });
    }

    async validate(jwtdecode: JwtDecode) {
        return jwtdecode;
    }
}