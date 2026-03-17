import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from './config/mongo.config';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { TelegramModule } from './telegram/telegram.module';
import { TELEGRAM_MODULE_OPTIONS } from './telegram/telegram.conts';
import telegramConfig from './config/telegram.config';

@Module({
  imports: [
    UserModule,
    TopPageModule,
    ProductModule,
    ReviewModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: mongoConfig,
    }),
    TelegramModule.forRootAsync({
      inject: [ConfigService],
      useFactory: telegramConfig
    }),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
