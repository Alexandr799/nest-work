import { IsNumber, IsString, Max, Min, minLength, MinLength } from 'class-validator'

export class CreateReviewDto {

    @IsString()
    @MinLength(1)
    name!: string;

    @IsString()
    @MinLength(1)
    title!: string;

    @IsString()
    @MinLength(1)
    description!: string;

    @IsNumber()
    @Min(1)
    @Max(5)
    rating!: number;

    @IsString()
    @MinLength(1)
    productId!: string
}