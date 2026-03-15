import { Injectable } from '@nestjs/common';
import { ProductDocument, Product } from './models/product.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { Model } from 'mongoose';
import { FindProductDto } from './dto/find-product.dto';
import { Review } from 'src/review/models/review.model';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private Product: Model<ProductDocument>) {

    }

    async create(dto: CreateProductDto) {
        return await this.Product.create(dto)
    }

    async findById(id: string) {
        return await this.Product.findById(id).exec()
    }

    async deleteById(id: string) {
        return this.Product.findByIdAndDelete(id).exec()
    }

    async updateById(id: string, dto: CreateProductDto) {
        return await this.Product.findByIdAndUpdate(id, dto).exec()
    }

    async find(dto: FindProductDto) {
        const data = await this.Product.aggregate([
            {
                $match: {
                    categories: dto.category
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $limit: dto.limit
            },
            {
                $lookup: {
                    from: 'Review',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'review'
                }
            },
            {
                $addFields: {
                    reviewCount: { $size: '$review' },
                    reviewAvg: { $avg: '$review.rating' },
                    reviews: {
                        $function: {
                            body: `function(reviews) {
                                reviews.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
                                return reviews
                            }`,
                            args: [],
                            lang: 'js'
                        }
                    }
                }
            }
        ]).exec()
        return data as Product & { review: Review, reviewCount: number, reviewAvg: number }[]
    }
}
