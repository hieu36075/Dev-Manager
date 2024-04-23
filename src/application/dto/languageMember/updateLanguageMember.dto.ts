import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateLanguageMemberDTO } from "./createLanguageMember.dto";
import { IsOptional, IsString } from "class-validator";

export class UpdateLanguageMemberDTO extends PartialType(CreateLanguageMemberDTO){
    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    languageid?:string
}