import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/user/dto/auth.dto';


const authLogin: AuthDto = {
    "login": "hello@alexstrigo.ru",
    "password": "12345678"
}
const authLoginFail: AuthDto = {
    "login": "hello@alexstrsdigo.ru",
    "password": "12345678"
}
describe('UserController (e2e)', () => {
    let app: INestApplication<App>;
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

    it('/user/login (POST)', async () => {
        return request(app.getHttpServer())
            .post('/user/login')
            .send(authLogin)
            .expect(200)
            .then(({ body }: request.Response) => {
                expect(body.access_token).toBeDefined()
            });
    });

    it('/user/login (POST)', async () => {
        return request(app.getHttpServer())
            .post('/user/login')
            .send(authLoginFail)
            .expect(401)
    });

});
