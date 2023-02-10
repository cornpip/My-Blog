import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CheckUserDto } from '@/user/dto/check_user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(LocalStrategy.name);

    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    // object 하나로 받을 수는 없나
    async validate(email: string, password: string): Promise<any> {
        try{
            const check_use_dto: CheckUserDto = {email: email, password: password};
            return await this.authService.validateUser(check_use_dto);
        }catch(err){
            throw new UnauthorizedException(err.message);
        }
    }
}