import { CreateLanguageDTO } from "@/application/dto/language/create-language.dto"
import { PageOptionsDto } from "@/application/dto/pagination/paginationOptions"
import { CreateLanguageCommand } from "@/application/use-case/language/command/create-language/create-language.command"
import { UpdateLanguageCommand } from "@/application/use-case/language/command/update-language/update-language.handler"
import { GetAllLanguageQuery } from "@/application/use-case/language/query/get-all-language/get-all-language.command"
import { LanguageM } from "@/domain/model/language.model"
import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { ApiTags } from "@nestjs/swagger"
import { plainToClass } from "class-transformer"


@Controller('language')
@ApiTags('Language')
export class LanguageController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){
        
    }

    @Get()
    findAll(@Query() pageOptionsDto: PageOptionsDto):Promise<LanguageM[]>{
        return this.queryBus.execute(new GetAllLanguageQuery(pageOptionsDto))
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
    async update(@Query('id') id:string, @Body()updateLanguageDto: CreateLanguageDTO ): Promise<LanguageM | undefined>{
        return await this.commandBus.execute(new UpdateLanguageCommand(id, updateLanguageDto.name))
    }
}