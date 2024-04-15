import { CreatePositionDTO } from "@/application/dto/position/create-position.dto";
import { UpdatePostionDTO } from "@/application/dto/position/update-postiion.dto";
import { CreateTechnicalDTO } from "@/application/dto/technical/create-technical.dto";
import { CreateTechnicalCommand } from "@/application/use-case/technical/command/create-technical/create-technical.command";
import { GetAllTechnicalQuery } from "@/application/use-case/technical/queries/get-all-technical/get-all-technical.command";
import { PositionM } from "@/domain/model/position.model";
import { TechnicalM } from "@/domain/model/technical.model";
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
    create(@Body() createTechnicalDTO : CreateTechnicalDTO): Promise<TechnicalM>{
        return this.commandBus.execute(new CreateTechnicalCommand(createTechnicalDTO.name))
    }

    @Patch(':id')
    update(@Query('id') id:string, @Body() updatePositionDTO : UpdatePostionDTO): Promise<PositionM | undefined>{
        return
    }
}