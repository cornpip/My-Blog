import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create_user.dto';
import { User } from '../entities/user.entity';
import * as argon2 from "argon2";
import { CheckUserDto } from '../dto/check_user.dto';
import { JwtDecode } from '@/jwt/jwt.interface';
// import { SigninUserDto } from '../../auth/signin_user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userrepo: Repository<User>
    ) { }

    async signup(create_user_dto: CreateUserDto) {
        if ((await this.checkEmail(create_user_dto.email)).length !== 0) throw new Error("already exist user");
        const ing_user = new User();
        ing_user.email = create_user_dto.email;
        ing_user.password = await this.hashfunc(create_user_dto.password);
        await this.userrepo.save(ing_user);
        return;
    }

    hashfunc(pwd: string) {
        return argon2.hash(pwd);
    }

    async checkEmail(email: string) {
        const db_email = await this.userrepo.find({
            select: {
                email: true
            },
            where: {
                email: email
            }
        });
        return db_email;
    }

    async checkUser(dto: CheckUserDto) {
        const db_user = await this.userrepo.findOne({
            where: {
                email: dto.email
            }
        })
        return db_user;
    }

    async currentUser(req_user: JwtDecode) {
        const user = await this.userrepo.findOne({
            where: {
                id: req_user.userId
            }
        })
        return user;
    }

    async findPosts() {
        try {
            const user = await this.userrepo.findOne({
                relations: {
                    posts: true
                },
                where: {
                    id: 1
                }
            });
            console.log("posts 개수:", user.posts.length);
        } catch (e) {
            console.log(e);
        }
        return;
    }

    async compareUser(u1: User, u2: User){
        if ( u1.created.toString() == u2.created.toString() && u1.email == u2.email && u1.password == u2.password && u1.id == u2.id && u1.posts == u2.posts ) return true;
        return false;
    }
}
