import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // 테스트 2개 이상 사용할 경우 필요한 메소드, memo.txt 참조
  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('typeorm in nest, just coding');
  });

  describe('hello jest', () => {
    it('two plus two is four', () => {
      expect(2 + 2).toBe(4);
    });
  });

  // users에 대한 테스트
  describe('/users', () => {
    // 현재 사용자 정보 가져오기 api 테스트
    it('/users (GET)', async () => {
      const res = await request(app.getHttpServer()).get('/users');
      // 로그인에 대한 내용이 없었으므로 401 에러가 발생해야 정상
      expect(res.statusCode).toBe(401);
    });

    // 회원가입 테스트
    it('/users (POST)', async () => {
      const res = await request(app.getHttpServer()).post('/users').send({
        email: 'e2e_test@email.com',
        password: '0000',
        username: 'test',
      });

      // expect(res.statusCode).toBe(201);
      expect(res.statusCode).toBe(401); // 'e2e_test@email.com'는 이미 존재하는 계정이므로 401
    });

    // 로그인 테스트
    it('/users/login (POST)', async () => {
      const res = await request(app.getHttpServer()).post('/users/login').send({
        email: 'e2e_test@email.com',
        password: '0000',
      });

      expect(res.statusCode).toBe(200);
      console.log(res.headers);
    });

    // 이번 연습에서는 성공 사례만 작성했지만,
    // 실무에서는 email을 적지 않았을 경우, password를 적지 않았을 경우 등
    // 실패 사례에 대한 테스트도 진행하는 것이 좋다
  });
});
