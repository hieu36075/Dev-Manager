import { Roles } from "@/application/common/decorator/roles.decorator"
import { Role } from "@/application/common/enums/role.enum"
import { JwtAuthGuard } from "@/application/common/guards/jwtAuth.guard"
import { RolesGuard } from "@/application/common/guards/role.guard"
import { CreateProjectDTO } from "@/application/dto/project/create-project.dto"
import { UpdateProjectDTO } from "@/application/dto/project/update-project.dto"
import { CreateProjectCommand } from "@/application/use-case/project/command/create-project/create-project.command"
import { UpdateProjectCommand } from "@/application/use-case/project/command/update-project/update-project.command"
import { GetAllProjectQuery } from "@/application/use-case/project/queries/get-all-project/get-all-project.handler"
import { ProjectM } from "@/domain/model/project.model"
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"

@Controller('project')
@ApiTags('Project')
@Roles(Role.MANAGER)
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus : QueryBus
    ){

    }

    @Get()
    async findAll():Promise<ProjectM[]>{
        return this.queryBus.execute(new GetAllProjectQuery())
    }

    @Post()
    async create(@Body()createProjectDTO : CreateProjectDTO) : Promise<any>{
        return await this.commandBus.execute(new CreateProjectCommand(
            createProjectDTO.name,
            createProjectDTO.description,
            createProjectDTO.startDate,
            createProjectDTO.endDate,
            createProjectDTO.technical,
            createProjectDTO.userId
        ))
    }

    @Patch(':id')
    async update(@Param('id') id:string,@Body()updateProjectDTO:UpdateProjectDTO): Promise<any>{
        return await this.commandBus.execute(new UpdateProjectCommand(
            id,
            updateProjectDTO.name,
            updateProjectDTO.description,
            updateProjectDTO.startDate,
            updateProjectDTO.endDate,
            updateProjectDTO.technical,
            updateProjectDTO.userId,    
        ))
    }

        
}

