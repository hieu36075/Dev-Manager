import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSkillDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string
}