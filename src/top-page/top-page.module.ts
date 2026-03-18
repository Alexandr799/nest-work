import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPage, TopPageSchema } from './models/top-page.model';
import { TopPageService } from './top-page.service';
import { HhModule } from 'src/hh/hh.module';

@Module({
  imports: [
    HhModule,
    MongooseModule.forFeature([
    { name: TopPage.name, schema: TopPageSchema }
  ])],
  controllers: [TopPageController],
  providers: [TopPageService],
})
export class TopPageModule { }
