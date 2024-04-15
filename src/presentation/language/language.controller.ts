import { CreateLanguageDTO } from "@/application/dto/language/create-language.dto"
import { LanguageM } from "@/domain/model/language.model"
import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { ApiTags } from "@nestjs/swagger"


@Controller('technical')
@ApiTags('Technical')
export class TechnicalController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){
        
    }

    @Get()
    findAll():Promise<LanguageM[]>{
        return 
    }

    // @Get(':id')
    // findById(@Query('id') id:string):Promise<TechnicalM>{
    //     return
    // }

    @Post()
    create(@Body() createLanguageDto : CreateLanguageDTO): Promise<LanguageM>{
        return 
    }

    @Patch(':id')
    update(@Query('id') id:string, ): Promise<LanguageM | undefined>{
        return
    }
}