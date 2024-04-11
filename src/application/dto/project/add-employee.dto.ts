import { CreateProjectCommand } from "@/application/use-case/project/command/create-project/create-project.command";
import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AddEmployeeDTO{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'uuid',
        example: 'string',
    })
    userId: string


    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'uuid',
        example: 'string',
    })
    projectId: string

    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'uuid',
        example: 'string',
    })
    idManager: string


}