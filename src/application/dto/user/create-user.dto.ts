import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDTO{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Email address of the user',
        example: 'email@example.com',
    })
    email: string;

    // @IsString()
    // @IsNotEmpty()
    // @ApiProperty({
    //     description: 'Name user',
    //     example: 'string',
    // })
    userName?: string;

    // @IsString()
    // @IsNotEmpty()
    // @ApiProperty({
    //     description: 'Email address of the user',
    //     example: 'string',
    // })
    password?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Full name of the user',
        example: 'string',
    })
    fullName :string

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({
        description: 'isManager',
        example: false,
        default: false
    })
    isManager:boolean 

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'dayOfBirth time using ISO8601',
        example: '2024-04-08T08:06:40Z',
    })
    dayOfBirth : string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description : string

    @IsString()
    @IsOptional()
    @ApiProperty()
    managerId?: string

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Array of technical IDs associated with the user',
        example: ['technical1', 'technical2'],
        type: [String],
    })
    technical : string[];

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Array of position IDs associated with the user',
        example: ['position1', 'position2'],
        type: [String],
    })
    positions : string[];

    
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Array of language IDs associated with the user',
        example: ['Language1', 'Language2'],
        type: [String],
    })
    language : string[];

}