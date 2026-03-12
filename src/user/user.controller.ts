import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from './user.service';
import { ALREADY_REGISTRED } from './user.const';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {

    }

    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() dto: AuthDto) {
        const oldUser = await this.userService.getByEmail(dto.login)
        if (oldUser) {
            throw new BadRequestException(ALREADY_REGISTRED)
        }

        return await this.userService.createUser(dto)
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: AuthDto) {
        const user = await this.userService.getAuthUser(dto)
        return await this.userService.login(user.email)
    }
}
