import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDTO{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Email address of the user',
        example: 'email@example.com',
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Email address of the user',
        example: 'string',
    })
    password: string;
}