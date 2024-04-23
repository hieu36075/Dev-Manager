import { CreateLanguageMemberDTO } from "@/application/dto/languageMember/createLanguageMember.dto";
import { UpdateLanguageMemberDTO } from "@/application/dto/languageMember/updateLanguageMember.dto";
import { CreatePositionDTO } from "@/application/dto/position/create-position.dto";
import { UpdatePostionDTO } from "@/application/dto/position/update-postiion.dto";
import { UpdateLanguageCommand } from "@/application/use-case/language/command/update-language/update-language.handler";
import { CreateLanguageMemberCommand } from "@/application/use-case/languageMember/command/create-languageMember/create-languageMember.command";
import { DeleteLanguageMemberCommand } from "@/application/use-case/languageMember/command/delete-languageMember/delete-languageMember.command";
import { CreatePositionCommand } from "@/application/use-case/position/command/create-position/create-position.command";
import { UpdateLanguageUserCommand } from "@/application/use-case/user/command/updateLanguage/update-language.command";
import { PositionM } from "@/domain/model/position.model";
import { LanguageMember } from "@/infrastructures/entities/languageMember.entity";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";

@Controller('languageMember')
@ApiTags('LanguageMember')
export class PositionController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus : QueryBus
    ){

    }

    @Post()
    create(@Body() createLanguageMemberDTO : CreateLanguageMemberDTO): Promise<LanguageMember>{
        return this.commandBus.execute(plainToClass(CreateLanguageMemberCommand, createLanguageMemberDTO))
    }

    @ApiProperty()
    @Patch(':id')
    update(@Param('id') id:string, @Body() updateLanguageMemberDTO : UpdateLanguageMemberDTO): Promise<LanguageMember | undefined>{
        return this.commandBus.execute(new UpdateLanguageUserCommand(
            id,
            updateLanguageMemberDTO.level,
            updateLanguageMemberDTO.experience,
            updateLanguageMemberDTO.languageid
        ))
    }

    @Delete('')
    delete(@Param('id') id:string):Promise<void>{
        return this.commandBus.execute(new DeleteLanguageMemberCommand(id))
    }
}