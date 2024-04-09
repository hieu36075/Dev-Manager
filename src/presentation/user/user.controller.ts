import { Roles } from "@/application/common/decorator/roles.decorator";
import { Role } from "@/application/common/enums/role.enum";
import { JwtAuthGuard } from "@/application/common/guards/jwtAuth.guard";
import { RolesGuard } from "@/application/common/guards/role.guard";
import { CreateUserDTO } from "@/application/dto/user/create-user.dto";
import { CreateAccountCommand } from "@/application/use-case/user/command/createUser/create-account.command";
import { GetAllUserQuery } from "@/application/use-case/user/queries/getAllUser/get-all-user.command";
import { UserM } from "@/domain/model/user.model";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller('user')
@ApiTags('User')
@ApiBearerAuth('JWT-auth')
@Roles(Role.EMPLOYEE)
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus : QueryBus
    ){

    }

    @Get()
    async getAll():Promise<UserM>{
        return await this.queryBus.execute(new GetAllUserQuery())
    }
    @Post()
   async register(@Body()createUserDTO : CreateUserDTO) : Promise<any>{
        return await this.commandBus.execute(new CreateAccountCommand(createUserDTO.email, createUserDTO.userName, createUserDTO.password))
    }

}