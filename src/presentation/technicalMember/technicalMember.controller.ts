import { Roles } from "@/application/common/decorator/roles.decorator";
import { Role } from "@/application/common/enums/role.enum";
import { JwtAuthGuard } from "@/application/common/guards/jwtAuth.guard";
import { RolesGuard } from "@/application/common/guards/role.guard";
import { CreateLanguageMemberDTO } from "@/application/dto/languageMember/createLanguageMember.dto";
import { UpdateLanguageMemberDTO } from "@/application/dto/languageMember/updateLanguageMember.dto";
import { CreateTechnicalDTO } from "@/application/dto/technical/create-technical.dto";
import { UpdateTechnicalDTO } from "@/application/dto/technical/update-technical.dto";
import { CreateLanguageMemberCommand } from "@/application/use-case/languageMember/command/create-languageMember/create-languageMember.command";
import { DeleteLanguageMemberCommand } from "@/application/use-case/languageMember/command/delete-languageMember/delete-languageMember.command";
import { CreateTechnicalCommand } from "@/application/use-case/technical/command/create-technical/create-technical.command";
import { DeleteTechnicalMemberCommand } from "@/application/use-case/technicalMember/command/delete-technical/delete-technical.command";
import { UpdateTechnicalMemberCommand } from "@/application/use-case/technicalMember/command/update-technical/update-technical.command";
import { UpdateLanguageUserCommand } from "@/application/use-case/user/command/updateLanguage/update-language.command";
import { LanguageMember } from "@/infrastructures/entities/languageMember.entity";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";

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
    create(@Body() createTechnicalDTO : CreateTechnicalDTO): Promise<LanguageMember>{
        return this.commandBus.execute(plainToClass(CreateTechnicalCommand, createTechnicalDTO))
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
    delete(@Param('id') id:string):Promise<void>{
        return this.commandBus.execute(new DeleteTechnicalMemberCommand(id))
    }
}