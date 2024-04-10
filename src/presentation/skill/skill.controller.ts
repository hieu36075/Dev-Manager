import { CreatePositionDTO } from "@/application/dto/position/create-position.dto";
import { UpdatePostionDTO } from "@/application/dto/position/update-postiion.dto";
import { CreateSkillDTO } from "@/application/dto/skill/create-skill.dto";
import { CreateSkillCommand } from "@/application/use-case/skill/command/create-skill/create-skill.command";
import { GetAllSkillQuery } from "@/application/use-case/skill/queries/get-all-skill/get-all-skill.command";
import { PositionM } from "@/domain/model/position.model";
import { SkillM } from "@/domain/model/skill.model";
import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

@Controller('skill')
@ApiTags('Skill')
export class SkillController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){
        
    }

    @Get()
    findAll():Promise<SkillM[]>{
        return this.queryBus.execute(new GetAllSkillQuery())
    }

    @Get(':id')
    findById(@Query('id') id:string):Promise<SkillM>{
        return
    }

    @Post()
    create(@Body() createSkillDTO : CreateSkillDTO): Promise<SkillM>{
        return this.commandBus.execute(new CreateSkillCommand(createSkillDTO.name))
    }

    @Patch(':id')
    update(@Query('id') id:string, @Body() updatePositionDTO : UpdatePostionDTO): Promise<PositionM | undefined>{
        return
    }
}