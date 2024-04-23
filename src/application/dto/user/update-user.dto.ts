import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateUserDTO } from "./create-user.dto";
import { IsOptional, IsString } from "class-validator";


export class UpdateUserDTO extends PartialType(CreateUserDTO){
    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    avatarUrl?: string
}