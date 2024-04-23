import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateTechnicalDTO } from "../technical/create-technical.dto";
import { IsOptional, IsString } from "class-validator";


export class UpdateTechnicalMemberDTO extends PartialType(CreateTechnicalDTO){
    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    technicalId?:string
}