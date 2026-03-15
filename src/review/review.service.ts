import { Injectable } from '@nestjs/common';
import {  ReviewDocument, Review } from './models/review.model';
import { CreateReviewDto } from './dto/CreateReviewDto';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, Types } from 'mongoose';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name)
        private readonly Review: Model<ReviewDocument>,
    ) {

    }

    async create(dto: CreateReviewDto): Promise<ReviewDocument> {
        return this.Review.create(dto)
    }

    async delete(id: string): Promise<ReviewDocument | null> {
        return this.Review.findByIdAndDelete(id).exec()
    }

    async findByProductId(productId: string): Promise<ReviewDocument[]> {
        return this.Review.find({ productId: productId }).exec();
    }

    async deleteByProductId(productId: string):Promise<DeleteResult> {
        const data = await this.Review.deleteMany({ productId: productId }).exec()
        return data
    }


}
