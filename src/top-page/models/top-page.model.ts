import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TopPageDocument = HydratedDocument<TopPageModel>

export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products
}

export class HhData {
    @Prop()
    count!: number;
    @Prop()
    juniorSalary!: number;
    @Prop()
    middleSalary!: number;
    @Prop()
    seniorSalary!: number;
}

export class Advantage {
    @Prop()
    title!: string;
    @Prop()
    description!: string;
}

@Schema({ timestamps: true, _id: true })
export class TopPageModel {
    @Prop({ enum: TopLevelCategory })
    firstCategory!: TopLevelCategory;
    @Prop()
    secondCategory!: string;
    @Prop()
    title!: string;
    @Prop({ unique: true })
    alias!: string;
    @Prop()
    category!: string;
    @Prop({ type: () => HhData,  _id: false })
    hh?: HhData
    @Prop({ type: () => [Advantage], _id: false })
    advantages!: Advantage[];
    @Prop()
    seoText!: string;
    @Prop()
    tags!: string[];
    @Prop()
    tagsTitle!: string;
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel)
