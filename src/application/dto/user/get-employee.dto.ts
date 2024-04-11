import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class GetEmployeeDTO{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ProjectId(Uuid)',
    })
    projectId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'ManagerId(Uuid)',
    })
    managerId: string;

    
}