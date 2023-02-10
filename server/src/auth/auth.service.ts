import { CheckUserDto } from '@/user/dto/check_user.dto';
import { UserService } from '@/user/service/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
        ){}
    
    async validateUser(check_user_dto: CheckUserDto){
        const db_user = await this.userService.checkUser(check_user_dto);
        if(db_user.length === 0) throw new Error("not exist user");
        const res = await argon2.verify(db_user[0].password, check_user_dto.password);
        if(!res) throw new Error("wrong password");
        return db_user[0];
    }

    async login(user: User){
        const payload = { username: user.email, sub: user.id };
        return{
            access_token: this.jwtService.sign(payload),
        } ;
    }
}
