import { CreateProjectCommand } from "@/application/use-case/project/command/create-project/create-project.command";
import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDTO{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Name for project',
        example: 'string',
    })
    name: string


    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Description for project',
        example: 'string',
    })
    description: string

    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'String date time using ISO8601',
        example: '2024-04-08T08:06:40Z',
    })
    startDate: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'String date time using ISO8601',
        example: '2024-04-08T08:06:40Z',
    })
    endDate: string

    @IsArray()
    @ArrayNotEmpty()
    @ApiProperty({
        description: 'Techical using for project',
        example: '["C#", "java"]',
    })
    technical: string[];

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User id create Project',
        example: 'string',
    })
    userId?: string
    


}