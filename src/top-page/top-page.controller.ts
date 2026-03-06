import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './find-top-page.dto';

@Controller('top-page')
export class TopPageController {

    @Post('create')
    async create(@Body() dto: Omit<TopPageModel, '_id'>) {

    }

    @Get(':id')
    async get(@Param('id') id: string) {

    }

    @Delete(':id')
    async delete(@Param('id') id: string) {

    }

    @Patch(':id')
    async patch(@Body('id') dto: TopPageModel) {

    }


    @Post('find')
    @HttpCode(200)
    async find(@Body() dto: FindTopPageDto) {

    }
}
