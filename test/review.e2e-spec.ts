import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/CreateReviewDto';
import { Types } from 'mongoose';
import { AuthDto } from 'src/user/dto/auth.dto';

const productId = new Types.ObjectId().toHexString()
const testDto: CreateReviewDto = {
  title: 'Заголовок',
  name: 'TEST',
  description: 'Описание тесовое',
  rating: 5,
  productId,
}

const testDtoFail: CreateReviewDto = {
  title: 'Заголовок',
  name: 'TEST',
  description: 'Описание тесовое',
  rating: -1,
  productId,
}
const authLogin: AuthDto = {
  "login": "hello@alexstrigo.ru",
  "password": "12345678"
}
let token: string
describe('ReviewController (e2e)', () => {
  let app: INestApplication<App>;
  let createdId: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const { body: { access_token } } = await request(app.getHttpServer())
      .post('/user/login')
      .send(authLogin)

    token = access_token
  });

  afterEach(async () => {
    await app.close();
  });

  it('/review/create (POST)', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .set('Authorization', `Bearer ${token}`)
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id
        expect(createdId).toBeDefined()
      });
  });


  it('/review/create (POST)', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .set('Authorization', `Bearer ${token}`)
      .send(testDtoFail)
      .expect(400)
      .then(({ body }: request.Response) => {
        expect(
          Array.isArray(body.message)
        ).toBe(true)
      });
  });


  it(`/review/byProduct/:productId (GET)`, async () => {
    return request(app.getHttpServer())
      .get(`/review/byProduct/${productId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBeGreaterThan(0)
      });
  });

  it(`/review/:id (DELETE)`, async () => {
    return request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  });

});
