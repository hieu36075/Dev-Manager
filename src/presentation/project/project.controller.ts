import { Roles } from "@/application/common/decorator/roles.decorator"
import { Role } from "@/application/common/enums/role.enum"
import { JwtAuthGuard } from "@/application/common/guards/jwtAuth.guard"
import { RolesGuard } from "@/application/common/guards/role.guard"
import { PageOptionsDto } from "@/application/dto/pagination/paginationOptions"
import { AddEmployeeDTO } from "@/application/dto/project/add-employee.dto"
import { CreateProjectDTO } from "@/application/dto/project/create-project.dto"
import { UpdateProjectDTO } from "@/application/dto/project/update-project.dto"
import { AddUserProjectCommand } from "@/application/use-case/project/command/add-user-project/add-user-project.command"
import { CreateProjectCommand } from "@/application/use-case/project/command/create-project/create-project.command"
import { UpdateProjectCommand } from "@/application/use-case/project/command/update-project/update-project.command"
import { GetAllProjectQuery } from "@/application/use-case/project/queries/get-all-project/get-all-project.command"
import { plainToClass } from 'class-transformer';
import { ProjectM } from "@/domain/model/project.model"
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { GetProjectByIdQuery } from "@/application/use-case/project/queries/get-project-by-id/get-project-by-id.command"
import { DeleteProjectCommand } from "@/application/use-case/project/command/delete-project/delete-project.command"
import { DeleteEmployeeProjectCommand } from "@/application/use-case/project/command/delete-employee/delete-employee.command"
import { GetProjectInMonthQuery } from "@/application/use-case/technical/queries/getProjectInMonth/get-project-in-month.command"

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
    async findAll(@Query() pageOptionsDto: PageOptionsDto):Promise<ProjectM[]>{
        return this.queryBus.execute(new GetAllProjectQuery(pageOptionsDto))
    }

    @Get('/projectInMonth')
    async projectInMonth():Promise<ProjectM[]>{
        // return this.queryBus.execute(new GetAllProjectQuery())
        return this.queryBus.execute(new GetProjectInMonthQuery())
    }

    @Get(":id")
    async getById(@Param('id') id:string):Promise<ProjectM[]>{
        return this.queryBus.execute(new GetProjectByIdQuery(id))
    }

    @Post()
    async create(@Body()createProjectDTO : CreateProjectDTO) : Promise<any>{
        return await this.commandBus.execute(new CreateProjectCommand(
            createProjectDTO.name,
            createProjectDTO.description,
            createProjectDTO.startDate,
            createProjectDTO.endDate,
            createProjectDTO.technical,
            createProjectDTO.language,
            createProjectDTO.managerId,
            createProjectDTO.employeeId,
        ))
    }
    @Post('add-employee')
    async addEmployee(@Body() addEmployeeDto: AddEmployeeDTO): Promise<any>{
        const command = plainToClass(AddUserProjectCommand, addEmployeeDto);
        return await this.commandBus.execute(command)
    }

    @Delete('unassign-employee/:id')
    async unassignEmployee(@Param('id') id: string): Promise<any>{
        return await this.commandBus.execute(new DeleteEmployeeProjectCommand(id))
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
            updateProjectDTO.language,
            updateProjectDTO.managerId, 
            updateProjectDTO.status
        ))
    }

    @Delete(':id')
    delelte (@Param('id') id:string){
        return this.commandBus.execute(new DeleteProjectCommand(id))
    }
}

