import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopPage, TopPageDocument } from './models/top-page.model';
import { Model } from 'mongoose';
import { CreateTopPageDTO } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { UNIQUE_ALIAS_PAGE } from './top-page.const';

@Injectable()
export class TopPageService {
    constructor(@InjectModel(TopPage.name) private topPageServce: Model<TopPageDocument>) {

    }

    async create(dto: CreateTopPageDTO) {
        if (await this.topPageServce.findOne({ alias: dto.alias }).exec()) {
            new BadRequestException(UNIQUE_ALIAS_PAGE)
        }
        return await this.topPageServce.create(dto)
    }


    async getById(id: string) {
        return await this.topPageServce.findById(id).exec()
    }

    async deleteById(id: string) {
        return await this.topPageServce.findByIdAndDelete(id).exec()
    }

    async updateById(id: string, dto: CreateTopPageDTO) {
        return await this.topPageServce.findByIdAndUpdate(id, dto).exec()
    }

    async findByCategory(dto: FindTopPageDto) {
        const data = await this.topPageServce.aggregate([
            {
                $match: {
                    firstCategory: dto.firstCategory
                }
            },
            {
                $group: {
                    _id: { secondCategory: '$secondCategory' },
                    pages: {
                        $push: {
                            alias: "$alias",
                            title: "$title"
                        }
                    }
                }
            },
            {
                $limit: dto.limit
            }
        ]).exec()
        return data as TopPage[]
    }

    async textSearch(text: string) {
        return await this.topPageServce.find({
            $text: {
                $search: text,
                $caseSensitive: false,
            }
        }).exec()
    }
}
