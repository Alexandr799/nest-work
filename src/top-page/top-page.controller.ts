import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TopPage } from './models/top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { IdValidation } from 'src/pipes/id-validation.pipe';
import { TopPageService } from './top-page.service';
import { CreateTopPageDTO } from './dto/create-top-page.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {

    constructor(private topPageServce: TopPageService) {

    }
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() dto: CreateTopPageDTO) {
        return this.topPageServce.create(dto)
    }

    @Get(':id')
    async get(@Param('id', IdValidation) id: string) {
        const data = await this.topPageServce.getById(id)
        if (data) {
            throw new HttpException('', HttpStatus.NOT_FOUND)
        }
        return data
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidation) id: string) {
        const data = await this.topPageServce.deleteById(id)
        if (data) {
            throw new HttpException('', HttpStatus.NOT_FOUND)
        }
        return data
    }
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patch(@Param('id', IdValidation) id: string, @Body() dto: CreateTopPageDTO) {
        const data = await this.topPageServce.updateById(id, dto)
        if (data) {
            throw new HttpException('', HttpStatus.NOT_FOUND)
        }
        return data
    }


    @Post('find')
    @HttpCode(200)
    async find(@Body() dto: FindTopPageDto) {
        return this.topPageServce.findByCategory(dto)
    }

    @Get('textSearch/:text')
    async textSearch(@Param('tedxt') text:string) {
        return this.topPageServce.textSearch(text)
    }
}
