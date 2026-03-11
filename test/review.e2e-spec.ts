import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/CreateReviewDto';
import { Types } from 'mongoose';

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
describe('ReviewController (e2e)', () => {
  let app: INestApplication<App>;
  let createdId: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/review/create (POST)', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
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
      .send(testDtoFail)
      .expect(400)
      .then(({ body }: request.Response) => {
        console.log(body)
        expect(
          Array.isArray(body.message) &&
          body.message.includes('123')
        ).toBe(true)
      });
  });


  it(`/review/byProduct/:productId (GET)`, async () => {
    return request(app.getHttpServer())
      .get(`/review/byProduct/${productId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        console.log(body)
        expect(body.length).toBeGreaterThan(0)
      });
  });

  it(`/review/:id (DELETE)`, async () => {
    return request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .expect(200)
  });

});
