import { CreateUserDTO } from "@/application/dto/user/create-user.dto";
import { CreateAccountCommand } from "@/application/use-case/user/command/createUser/create-account.command";
import { GetAllUserQuery } from "@/application/use-case/user/queries/getAllUser/get-all-user.command";
import { GetAllUserHandler } from "@/application/use-case/user/queries/getAllUser/get-all-user.handler";
import { UserM } from "@/domain/modal/user.modal";

import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

@Controller('user')
@ApiTags('User')
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