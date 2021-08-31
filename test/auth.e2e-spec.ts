import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Types, disconnect } from 'mongoose';

import { AppModule } from '../src/app.module';
import { AuthDTO } from '../src/auth/dto/auth.dto';

const loginDTO: AuthDTO = {
  login: 'a@a.com',
  password: '1',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDTO);

    token = response.body.accessToken;
  });

  it('/auth/login (POST) - success', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDTO)
      .expect(200)
      .then(({ body }: request.Response) => {
        const accessToken = body.accessToken;

        expect(accessToken).toBeDefined();
      });
  });

  it('/auth/login (POST) - fail: invalid email', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ login: 'invalid@invalid.com', password: 'test' })
      .expect(401, {
        statusCode: 401,
        message: 'Пользователь с таким email не найден',
        error: 'Unauthorized',
      });
  });

  it('/auth/login (POST) - fail: invalid password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ login: 'a@a.com', password: 'test' })
      .expect(401, {
        statusCode: 401,
        message: 'Неверный пароль',
        error: 'Unauthorized',
      });
  });

  afterAll(() => {
    disconnect();
  });
});
