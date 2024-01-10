import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as fs from 'fs';
import * as path from 'path';
declare const module: any;

async function bootstrap() {
  // const private_path = path.resolve(__dirname, "../secrets", "private.key");
  // const certificate_path = path.resolve(__dirname, "../secrets", "certificate.crt");
  // const httpsOptions = {
  //   key: fs.readFileSync(private_path),
  //   cert: fs.readFileSync(certificate_path),
  // }

  // const production = +process.env.PRODUCTION;
  // const log_level: Array<LogLevel> = production ? ['log', 'error', 'warn'] : ['log', 'error', 'warn', 'debug', 'verbose'];
  const app = await NestFactory.create(AppModule, {
    // logger: log_level,
    // httpsOptions,
  });
  //winston config level로 따라간다.
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  app.enableCors({
    origin: [configService.get('server.cors_origin')],
    methods: 'GET,POST,DELETE,PUT,PATCH,HEAD,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )
  await app.listen(configService.get('server.port'));

  /** 
   * 핫 리로드(hmr) 사용하면 EntityMetadataNotFoundError 나온다.
   * typeorm entity 컴파일을 제대로 수행하지 못하나?
  **/
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
