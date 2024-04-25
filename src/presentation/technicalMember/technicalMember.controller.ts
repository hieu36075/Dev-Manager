import { Roles } from "@/application/common/decorator/roles.decorator";
import { Role } from "@/application/common/enums/role.enum";
import { JwtAuthGuard } from "@/application/common/guards/jwtAuth.guard";
import { RolesGuard } from "@/application/common/guards/role.guard";
import { CreateTechnicalMemberCommand } from '@/application/use-case/technicalMember/command/create-technical/create-technicalMember.command';
import { DeleteTechnicalMemberCommand } from "@/application/use-case/technicalMember/command/delete-technical/delete-technical.command";
import { UpdateTechnicalMemberCommand } from "@/application/use-case/technicalMember/command/update-technical/update-technical.command";
import { LanguageMember } from "@/infrastructures/entities/languageMember.entity";
import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";
import { CreateTechnicalMemberDTO } from './../../application/dto/technicalMember/createTechicalMember.dto';

@Controller('technicalMember')
@ApiTags('TechnicalMember')
@ApiBearerAuth('JWT-auth')
@Roles(Role.MANAGER)
@UseGuards(JwtAuthGuard, RolesGuard)
export class TechnicalMemberController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus : QueryBus
    ){

    }

    
    @Post()
    create(@Body() createTechnicalDTO : CreateTechnicalMemberDTO): Promise<LanguageMember>{
        return this.commandBus.execute(
          plainToClass(CreateTechnicalMemberCommand, createTechnicalDTO),
        );
    }

    @ApiProperty()
    @Patch(':id')
    update(@Param('id') id:string, @Body() updateTechnicalMemberDTO : UpdateTechnicalMemberCommand): Promise<LanguageMember | undefined>{
        return this.commandBus.execute(new UpdateTechnicalMemberCommand(
            id,
            updateTechnicalMemberDTO.level,
            updateTechnicalMemberDTO.experience,
            updateTechnicalMemberDTO.technicalId
        ))
    }

    @Delete(':id')
    delete(@Param('id') id:string):Promise<any>{
        return this.commandBus.execute(new DeleteTechnicalMemberCommand(id))
    }
}