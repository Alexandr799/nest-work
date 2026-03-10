import { Injectable } from '@nestjs/common';
import {  ReviewDocument, ReviewModel } from './models/review.model';
import { CreateReviewDto } from './dto/CreateReviewDto';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, Types } from 'mongoose';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(ReviewModel.name)
        private readonly reviewModel: Model<ReviewDocument>,
    ) {

    }

    async create(dto: CreateReviewDto): Promise<ReviewDocument> {
        return this.reviewModel.create(dto)
    }

    async delete(id: string): Promise<ReviewDocument | null> {
        return this.reviewModel.findByIdAndDelete(id).exec()
    }

    async findByProductId(productId: string): Promise<ReviewDocument[]> {
        return this.reviewModel.find({ productId: productId }).exec();
    }

    async deleteByProductId(productId: string):Promise<DeleteResult> {
        const data = await this.reviewModel.deleteMany({ productId: productId }).exec()
        return data
    }


}
