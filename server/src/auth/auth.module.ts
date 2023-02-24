import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { TestModule } from '@/test/test.module';
import { Test2Module } from '@/test2/test2.module';
import { JwtCustomModule } from '@/jwt/jwt.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TestModule,
    // Test2Module,
    JwtCustomModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [
    AuthService,
  ]
})
export class AuthModule { }
