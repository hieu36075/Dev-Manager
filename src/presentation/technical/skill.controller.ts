import { CreatePositionDTO } from "@/application/dto/position/create-position.dto";
import { UpdatePostionDTO } from "@/application/dto/position/update-postiion.dto";
import { CreateSkillDTO } from "@/application/dto/skill/create-skill.dto";
import { CreateTechnicalCommand } from "@/application/use-case/skill/command/create-technical/create-technical.command";
import { GetAllTechnicalQuery } from "@/application/use-case/skill/queries/get-all-technical/get-all-technical.command";
import { PositionM } from "@/domain/model/position.model";
import { TechnicalM } from "@/domain/model/skill.model";
import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

@Controller('technical')
@ApiTags('Technical')
export class TechnicalController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){
        
    }

    @Get()
    findAll():Promise<TechnicalM[]>{
        return this.queryBus.execute(new GetAllTechnicalQuery())
    }

    @Get(':id')
    findById(@Query('id') id:string):Promise<TechnicalM>{
        return
    }

    @Post()
    create(@Body() createSkillDTO : CreateSkillDTO): Promise<TechnicalM>{
        return this.commandBus.execute(new CreateTechnicalCommand(createSkillDTO.name))
    }

    @Patch(':id')
    update(@Query('id') id:string, @Body() updatePositionDTO : UpdatePostionDTO): Promise<PositionM | undefined>{
        return
    }
}