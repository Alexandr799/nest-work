import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { USER_NOT_FOUND, WRONG_PASSWORD } from './user.const';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) {

    }

    async getByEmail(email: string) {
        return this.userModel.findOne({ email })
    }

    async createUser(dto: AuthDto) {
        const salt = genSaltSync(10);
        const newUser = new this.userModel({
            email: dto.login,
            passwordHash: hashSync(dto.password, salt)
        })

        return newUser.save();
    }

    async getAuthUser(dto: AuthDto) {
        const user = await this.getByEmail(dto.login)
        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND)
        }
        if (!compareSync(dto.password, user.passwordHash)) {
            throw new UnauthorizedException(WRONG_PASSWORD)
        }

        return user
    }

    async login(email:string) {
        const payload = { email } 
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
