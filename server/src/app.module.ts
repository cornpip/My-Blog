import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '@/config/configuration'
import { DbConfig } from './config/db.config';
import { TestController } from './test/test.controller';
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt_auth.guard';
import * as Joi from 'joi';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisConfigService } from './config/redis.config';
import { TokenMiddleware } from './middleware/token.middleware';
import { Test2Module } from './test2/test2.module';
import { JwtCustomModule } from './jwt/jwt.module';
import { WinstonModule } from 'nest-winston';
import { WinstonConfig } from './config/winston.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV == 'dev' ? '.env.dev' : '.env.prod',
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASSWORD: Joi.string().required(),
        MYSQL_DB: Joi.string().required(),
        ACC_TOKEN: Joi.string().required(),
        REF_TOKEN: Joi.string().required(),
        ACC_EXPIRE_TIME: Joi.string().required(),
        REF_EXPIRE_TIME: Joi.string().required(),
        REDIS_EXPIRE_TIME: Joi.number().required(),
        SERVER_PORT: Joi.number().required(),
        CORS_PORT: Joi.number().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        PRODUCTION: Joi.number().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useClass: DbConfig
    }),
    RedisModule.forRootAsync({
      useClass: RedisConfigService
    }),
    WinstonModule.forRootAsync({
      useClass: WinstonConfig
    }),
    PostModule,
    TestModule,
    UserModule,
    AuthModule,
    Test2Module,
    JwtCustomModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      // .exclude("auth/check")
      .forRoutes("*")
  }
}
