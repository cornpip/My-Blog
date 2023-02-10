import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create_user.dto';
import { User } from '../entities/user.entity';
import * as argon2 from "argon2";
import { CheckUserDto } from '../dto/check_user.dto';
// import { SigninUserDto } from '../../auth/signin_user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userrepo: Repository<User>
    ) { }

    async signup(create_user_dto: CreateUserDto) {
        if((await this.checkEmail(create_user_dto.email)).length !== 0) throw new Error("already exist user");
        const ing_user = new User();
        ing_user.email = create_user_dto.email;
        ing_user.password = await this.hashfunc(create_user_dto.password);
        await this.userrepo.save(ing_user);
        return;
    }

    hashfunc(pwd: string){
        return argon2.hash(pwd);
    }

    async checkEmail(email: string){
        const db_email = await this.userrepo.find({
            select:{
                email: true
            },
            where: {
                email: email
            }
        });
        return db_email;
    }

    async checkUser(dto: CheckUserDto){
        const db_user = await this.userrepo.find({
            where:{
                email: dto.email
            }
        })
        return db_user;
    }
}
