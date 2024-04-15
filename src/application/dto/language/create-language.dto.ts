import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateLanguageDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string
}