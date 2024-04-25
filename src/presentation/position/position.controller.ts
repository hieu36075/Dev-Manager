import { Roles } from "@/application/common/decorator/roles.decorator";
import { Role } from "@/application/common/enums/role.enum";
import { JwtAuthGuard } from "@/application/common/guards/jwtAuth.guard";
import { RolesGuard } from "@/application/common/guards/role.guard";
import { PageOptionsDto } from "@/application/dto/pagination/paginationOptions";
import { CreatePositionDTO } from "@/application/dto/position/create-position.dto";
import { UpdatePostionDTO } from "@/application/dto/position/update-postiion.dto";
import { CreatePositionCommand } from "@/application/use-case/position/command/create-position/create-position.command";
import { DeletePositionCommand } from "@/application/use-case/position/command/delete-postion/delete-position.command";
import { UpdatePositionCommand } from "@/application/use-case/position/command/update-position/update-position.command";
import { GetAllPostionQuery } from "@/application/use-case/position/queries/get-all-position/get-all-position.command";
import { PositionM } from "@/domain/model/position.model";
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller('position')
@ApiTags('Postition')
@ApiBearerAuth('JWT-auth')
@Roles(Role.MANAGER)
@UseGuards(JwtAuthGuard, RolesGuard)
export class PositionController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus : QueryBus
    ){

    }

    @Get()
    findAll(@Query() pageOptionsDto: PageOptionsDto):Promise<PositionM[]>{
        return this.queryBus.execute(new GetAllPostionQuery(pageOptionsDto))
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