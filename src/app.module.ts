import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { UserEntity } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { TagsModule } from './tags/tags.module';
import { VisitorsModule } from './visitors/visitors.module';
import { ProfilesModule } from './profiles/profiles.module';
import { BlogEntity } from './blogs/blogs.entity';
import { ProfileEntity } from './profiles/profiles.entity';
import { TagEntity } from './tags/tags.entity';
import { VisitorEntity } from './visitors/visitors.entity';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [UserEntity, BlogEntity, ProfileEntity, TagEntity, VisitorEntity],
    synchronize: false, //! set 'false' in production
    // 마이그레이션 후에는 false로 바꿀 것
    autoLoadEntities: true,
    logging: true,
    keepConnectionAlive: true,
    // 어플리케이션 종료 시 DB연결을 끊을 것인지에 대한 옵션, default는 false이다.
    // 이 옵션이 없으면 e2e 테스트 시
    // "이미 'default'라는 이름의 DB 연결 및 활성화 된 세션이 있어 같은 이름으로 DB 연결을 할 수 없습니다."는 에러가 발생함
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // Joi는 유효성 검사하는 라이브러리
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(5000),
        SECRET_KEY: Joi.string().required(),
        ADMIN_USER: Joi.string().required(),
        ADMIN_PASSWORD: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UsersModule,
    BlogsModule,
    TagsModule,
    VisitorsModule,
    ProfilesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
