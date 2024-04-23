import { CreatePositionDTO } from "@/application/dto/position/create-position.dto";
import { UpdatePostionDTO } from "@/application/dto/position/update-postiion.dto";
import { CreatePositionCommand } from "@/application/use-case/position/command/create-position/create-position.command";
import { DeletePositionCommand } from "@/application/use-case/position/command/delete-postion/delete-position.command";
import { UpdatePositionCommand } from "@/application/use-case/position/command/update-position/update-position.command";
import { GetAllPostionQuery } from "@/application/use-case/position/queries/get-all-position/get-all-position.command";
import { PositionM } from "@/domain/model/position.model";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

@Controller('position')
@ApiTags('Postition')
export class PositionController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus : QueryBus
    ){

    }

    @Get()
    findAll():Promise<PositionM[]>{
        return this.queryBus.execute(new GetAllPostionQuery())
    }

    @Get(':id')
    findById(@Query('id') id:string):Promise<PositionM>{
        return
    }

    @Post()
    create(@Body() createPositionDTO : CreatePositionDTO): Promise<PositionM>{
        return this.commandBus.execute(new CreatePositionCommand(createPositionDTO.name, createPositionDTO.description))
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() updatePositionDTO : UpdatePostionDTO): Promise<PositionM | undefined>{
        return this.commandBus.execute(new UpdatePositionCommand(id, updatePositionDTO.name, updatePositionDTO.description))
    }

    @Delete(':id')
    async delete(@Param('id') id:string):Promise<void>{
        return await this.commandBus.execute(new DeletePositionCommand(id))
    }
}