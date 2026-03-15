import { IsNumber, IsString, Min, MIN, MinLength } from "class-validator";
import { TopLevelCategory } from "../models/top-page.model";

export class FindTopPageDto {
    @IsString()
    @MinLength(1)
    firstCategory!: TopLevelCategory

    @IsNumber()
    @Min(1)
    limit!: number

}
