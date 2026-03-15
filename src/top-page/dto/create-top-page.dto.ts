import { IsArray, IsEnum, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { Advantage, HhData, TopLevelCategory } from "../models/top-page.model";
import { Type } from "class-transformer";

export class CreateTopPageDTO {
    @IsEnum(TopLevelCategory)
    firstCategory!: TopLevelCategory;

    @IsString()
    @MinLength(1)
    secondCategory!: string;

    @IsString()
    @MinLength(1)
    title!: string;

    @IsString()
    alias!: string;

    @IsString()
    @MinLength(1)
    category!: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => HhData)
    hh?: HhData

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Advantage)
    advantages!: Advantage[];

    @IsString()
    @MinLength(1)
    seoText!: string;

    @IsArray()
    @IsString({ each: true })
    tags!: string[];

    @IsString()
    @MinLength(1)
    tagsTitle!: string;
}