import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { HttpApiExceptionFilter } from './common/exceptions/http-api-exception.filter';

class Application {
  private logger = new Logger(Application.name);
  private DEV_MODE: boolean;
  private PORT: string;
  private corsOriginList: string[];
  private ADMIN_USER: string;
  private ADMIN_PASSWORD: string;

  constructor(private server: NestExpressApplication) {
    this.server = server;

    if (!process.env.SECRET_KEY) this.logger.error('Set "SECRET" env');
    this.DEV_MODE = process.env.NODE_ENV === 'production' ? false : true;
    this.PORT = process.env.PORT || '5000';
    this.corsOriginList = process.env.CORS_ORIGIN_LIST
      ? process.env.CORS_ORIGIN_LIST.split(',').map((origin) => origin.trim())
      : ['*'];
    // swagger 접속에 사용될 계정과 패스워드
    this.ADMIN_USER = process.env.ADMIN_USER;
    this.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  }

  private setUpBasicAuth() {
    this.server.use(
      ['/docs', '/docs-json'],
      expressBasicAuth({
        challenge: true,
        users: {
          [this.ADMIN_USER]: this.ADMIN_PASSWORD,
        },
      }),
    );
  }

  // swagger - http://localhost:5000/docs/
  private setUpOpenAPIMiddleware() {
    SwaggerModule.setup(
      'docs',
      this.server,
      SwaggerModule.createDocument(
        this.server,
        new DocumentBuilder()
          .setTitle('ctrs - blog API')
          .setDescription('TypeORM In Nest')
          .setVersion('0.0.1')
          .build(),
      ),
    );
  }

  // 미들웨어
  private async setUpGlobalMiddleware() {
    this.server.enableCors({
      origin: this.corsOriginList,
      credentials: true,
    });
    this.server.use(cookieParser());
    this.setUpBasicAuth();
    this.setUpOpenAPIMiddleware();
    this.server.useGlobalPipes(
      new ValidationPipe({
        transform: true, // string으로 들어오는 parameter의 데이터 타입을 변경
      }),
    );
    this.server.use(passport.initialize());
    this.server.use(passport.session());

    this.server.useGlobalInterceptors(
      new ClassSerializerInterceptor(this.server.get(Reflector)),
    );
    // 엔터티에서 Exclude 데코레이터가 붙은 컬럼은 리턴되는 필드에서 제외됨
    // users.entity.ts의 경우 'password' 컬럼에 Exclude가 붙어
    // 회원가입, 로그인 시 패스워드에 관한 데이터는 리턴 내용에서 제외되었음

    this.server.useGlobalFilters(new HttpApiExceptionFilter());
  }

  async bootstrap() {
    await this.setUpGlobalMiddleware();
    await this.server.listen(this.PORT);
  }

  startLog() {
    if (this.DEV_MODE) {
      this.logger.log(`✅ Server on http://localhost:${this.PORT}`);
    } else {
      this.logger.log(`✅ Server on port ${this.PORT}...`);
    }
  }

  errorLog(error: string) {
    this.logger.error(`🆘 Server error ${error}`);
  }
}

async function init(): Promise<void> {
  const server = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = new Application(server);
  await app.bootstrap();
  app.startLog();
}

init().catch((error) => {
  new Logger('init').error(error);
});
