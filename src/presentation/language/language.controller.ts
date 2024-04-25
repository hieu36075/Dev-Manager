import { Roles } from "@/application/common/decorator/roles.decorator"
import { Role } from "@/application/common/enums/role.enum"
import { JwtAuthGuard } from "@/application/common/guards/jwtAuth.guard"
import { RolesGuard } from "@/application/common/guards/role.guard"
import { CreateLanguageDTO } from "@/application/dto/language/create-language.dto"
import { PageOptionsDto } from "@/application/dto/pagination/paginationOptions"
import { CreateLanguageCommand } from "@/application/use-case/language/command/create-language/create-language.command"
import { DeleteLanguageCommand } from "@/application/use-case/language/command/delete-language/delete-laguage.handler"
import { UpdateLanguageCommand } from "@/application/use-case/language/command/update-language/update-language.handler"
import { GetAllLanguagePaginationQuery } from "@/application/use-case/language/query/get-all-language-pagination/get-all-language-pagination.command"
import { GetAllLanguagePaginationQueryHandler } from "@/application/use-case/language/query/get-all-language-pagination/get-all-language-pagination.handler"
import { GetAllLanguageQuery } from "@/application/use-case/language/query/get-all-language/get-all-language.command"
import { GetMostLanguageQuery } from "@/application/use-case/language/query/getMostLanguage/get-most-language.command"
import { LanguageM } from "@/domain/model/language.model"
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { plainToClass } from "class-transformer"


@Controller('language')
@ApiTags('Language')
// @ApiBearerAuth('JWT-auth')
// @Roles(Role.MANAGER)
// @UseGuards(JwtAuthGuard, RolesGuard)
export class LanguageController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){
        
    }

    @Get()
    findAll():Promise<LanguageM[]>{
        return this.queryBus.execute(new GetAllLanguageQuery())
    }

    @Get('pagination')
    findAllPagination(@Query() pageOptionsDto: PageOptionsDto):Promise<LanguageM[]>{
        return this.queryBus.execute(new GetAllLanguagePaginationQuery(pageOptionsDto))
    }
    @Get('getMostLanguage')
    mostLanguage ():Promise<any>{
        return this.queryBus.execute(new GetMostLanguageQuery())
    }

    // @Get(':id')
    // findById(@Query('id') id:string):Promise<TechnicalM>{
    //     return
    // }

    @Post()
    async create(@Body() createLanguageDto : CreateLanguageDTO): Promise<LanguageM>{
        const command =  plainToClass(CreateLanguageCommand, createLanguageDto)
        return await this.commandBus.execute(command)
    }

    @Patch(':id')
    async update(@Param('id') id:string, @Body()updateLanguageDto: CreateLanguageDTO ): Promise<LanguageM | undefined>{
        return await this.commandBus.execute(new UpdateLanguageCommand(id, updateLanguageDto.name))
    }

    @Delete(':id')
    async delete(@Param('id') id:string):Promise<void>{
        return await this.commandBus.execute(new DeleteLanguageCommand(id))
    }
}