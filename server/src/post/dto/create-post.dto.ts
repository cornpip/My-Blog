import { IsOptional, IsString } from "class-validator";

export class CreateFileDto {
    @IsString()
    readonly feature_title: string;

    @IsString()
    readonly sub_title: string;
}

export class CreateWrtieDto {
    @IsString()
    readonly feature_title: string;

    @IsString()
    readonly sub_title: string;

    @IsString()
    readonly content: string;

    @IsString()
    @IsOptional()
    readonly tags: string;
}