import { Roles } from "@/application/common/decorator/roles.decorator";
import { Role } from "@/application/common/enums/role.enum";
import { JwtAuthGuard } from "@/application/common/guards/jwtAuth.guard";
import { RolesGuard } from "@/application/common/guards/role.guard";
import { CreateLanguageMemberDTO } from "@/application/dto/languageMember/createLanguageMember.dto";
import { UpdateLanguageMemberDTO } from "@/application/dto/languageMember/updateLanguageMember.dto";
import { CreateLanguageMemberCommand } from "@/application/use-case/languageMember/command/create-languageMember/create-languageMember.command";
import { DeleteLanguageMemberCommand } from "@/application/use-case/languageMember/command/delete-languageMember/delete-languageMember.command";
import { UpdateLanguageUserCommand } from "@/application/use-case/user/command/updateLanguage/update-language.command";
import { LanguageMember } from "@/infrastructures/entities/languageMember.entity";
import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiProperty, ApiTags } from "@nestjs/swagger";
import { plainToClass } from "class-transformer";

@Controller('languageMember')
@ApiTags('LanguageMember')
@ApiBearerAuth('JWT-auth')
@Roles(Role.MANAGER)
@UseGuards(JwtAuthGuard, RolesGuard)
export class LanguageMemberController{
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

    @Delete(':id')
    delete(@Param('id') id:string):Promise<void>{
        return this.commandBus.execute(new DeleteLanguageMemberCommand(id))
    }
}