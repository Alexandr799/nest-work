import { IsNumber, IsString, Min } from "class-validator";

export class FindProductDto {
    @IsString()
    category!: string;

    @IsNumber()
    @Min(1)
    limit!: number;
}
