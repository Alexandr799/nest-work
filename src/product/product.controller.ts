import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Product } from './models/product.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUND } from './product.const';
import { IdValidation } from 'src/pipes/id-validation.pipe';

@Controller('product')
export class ProductController {

    constructor(private productServce: ProductService) {

    }

    @Post('create')
    async create(@Body() dto: CreateProductDto) {
        return await this.productServce.create(dto)
    }

    @Get(':id')
    async get(@Param('id', IdValidation) id: string) {
        const data = await this.productServce.findById(id)
        if (data) {
            throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        return data
    }

    @Delete(':id')
    async delete(@Param('id', IdValidation) id: string) {
        const data = await this.productServce.deleteById(id)
        if (data) {
            throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        return data
    }

    @Put(':id')
    async patch(@Param('id', IdValidation) id: string, @Body() dto: CreateProductDto) {
        const data = await this.productServce.updateById(id, dto)
        if (data) {
            throw new HttpException(PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        return data
    }


    @Post('find')
    @HttpCode(200)
    async find(@Body() dto: FindProductDto) {
        return  await this.productServce.find(dto)
    }

}
