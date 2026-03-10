import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './models/auth.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Auth.name, schema: AuthSchema }
  ])],
  providers: [AuthService]
})
export class AuthModule { }
