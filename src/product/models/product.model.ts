import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>

export class ProductCharacteristic {
    @Prop()
    name!: string

    @Prop()
    value!: string
}

@Schema({ timestamps: true, _id: true })
export class Product {
    @Prop()
    image!: string;

    @Prop()
    title!: string;

    @Prop()
    price!: number;

    @Prop()
    oldPrice!: number;

    @Prop()
    credit!: number;

    @Prop()
    description!: string;

    @Prop()
    calculatedRating!: number;

    @Prop()
    advantages!: string;

    @Prop()
    disadvatages!: string;

    @Prop({ type: () => [String] })
    categories!: string[];

    @Prop({ type: () => [String] })
    tags!: string;

    @Prop({ type: () => [ProductCharacteristic], _id: false })
    characteristics!: ProductCharacteristic[]
}


export const ProductSchema = SchemaFactory.createForClass(Product)
