import { CreatePositionDTO } from "@/application/dto/position/create-position.dto";
import { UpdatePostionDTO } from "@/application/dto/position/update-postiion.dto";
import { CreatePositionCommand } from "@/application/use-case/position/command/create-position/create-position.command";
import { PositionM } from "@/domain/model/position.model";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

@Controller('languageMember')
@ApiTags('LanguageMember')
export class PositionController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus : QueryBus
    ){

    }

    // @Post()
    // create(@Body() createPositionDTO : CreatePositionDTO): Promise<PositionM>{
    //     return this.commandBus.execute(new CreatePositionCommand(createPositionDTO.name, createPositionDTO.description))
    // }

    @Patch(':id')
    update(@Param('id') id:string, @Body() updatePositionDTO : UpdatePostionDTO): Promise<PositionM | undefined>{
        return
    }

    @Delete('')
    delete(@Param('id') id:string):Promise<void>{
        return
    }
}