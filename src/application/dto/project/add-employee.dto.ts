import { CreateProjectCommand } from "@/application/use-case/project/command/create-project/create-project.command";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddEmployeeDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'uuid',
        example: 'string',
    })
    employeeId: string


    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'uuid',
        example: 'string',
    })
    projectId: string

    @IsArray()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Array of position IDs associated with the user',
        example: ['fe', 'be'],
        type: [],
    })
    roles: [];



}