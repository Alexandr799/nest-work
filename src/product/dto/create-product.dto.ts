import { IsArray, IsNumber, IsObject, IsOptional, IsString, Min, MinLength, ValidateNested } from "class-validator";
import { ProductCharacteristic } from "../models/product.model";
import { Type } from "class-transformer";

export class CreateProductDto {
    @IsString()
    @MinLength(1)
    image!: string;

    @IsString()
    @MinLength(1)
    title!: string;

    @IsNumber()
    @Min(0)
    price!: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    oldPrice?: number;

    @IsNumber()
    @Min(0)
    credit!: number;

    @IsString()
    description!: string;

    @IsString()
    advantages!: string;

    @IsString()
    disadvatages!: string;

    @IsArray()
    @IsString({ each: true })
    categories!: string[];

    @IsString()
    tags!: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductCharacteristic)
    characteristics!: ProductCharacteristic[]
}
