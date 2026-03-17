import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReviewDto } from './dto/CreateReviewDto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.cont';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';
import { IdValidation } from 'src/pipes/id-validation.pipe';
import { TelegramService } from 'src/telegram/telegram.service';

@Controller('review')
export class ReviewController {

    constructor(private readonly reviewService: ReviewService,
        private readonly telegramService: TelegramService
    ) {

    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() dto: CreateReviewDto) {
        return await this.reviewService.create(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidation) id: string) {
        const doc =  await this.reviewService.delete(id)
        if (!doc) {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
        }

        return 
    }

    @Get('byProduct/:productId')
    async getByProduct(@Param('productId', IdValidation) productId: string, @UserEmail() email:string) {
        return [email]
    }

    @UseGuards(JwtAuthGuard)
    @Post('notify')
    async notify(@Body() dto: CreateReviewDto) {
        return this.telegramService.sendMessage(`${dto.name}\n Какой то текст`)
    }


}
