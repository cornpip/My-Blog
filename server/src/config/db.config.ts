import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbConfig implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) { }
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configService.get('mysql.host'),
            port: +this.configService.get<number>('mysql.port'),
            username: this.configService.get('mysql.username'),
            password: this.configService.get('mysql.password'),
            database: this.configService.get('mysql.database'),
            entities: ['dist/**/**/*.entity{.ts,.js}'],
            synchronize: true,
            // logging:true
        };
    }
}
