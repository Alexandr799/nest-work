import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModel } from './models/top-page.model';
import { AuthSchema } from 'src/auth/models/auth.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: TopPageModel.name, schema: AuthSchema }
  ])],
  controllers: [TopPageController]
})
export class TopPageModule { }
