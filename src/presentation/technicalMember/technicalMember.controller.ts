import { CreateTechnicalMemberDTO } from './../../application/dto/technicalMember/createTechicalMember.dto';
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
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";

@Controller('technicalMember')
@ApiTags('TechnicalMember')
export class TechnicalMemberController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus : QueryBus
    ){

    }

    @Post()
    create(@Body() createTechnicalDTO : CreateTechnicalMemberDTO): Promise<LanguageMember>{
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
    delete(@Param('id') id:string):Promise<any>{
        return this.commandBus.execute(new DeleteTechnicalMemberCommand(id))
    }
}