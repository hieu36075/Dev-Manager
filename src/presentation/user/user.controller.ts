import { CreateUserDTO } from "@/application/dto/user/create-user.dto";
import { CreateAccountCommand } from "@/application/use-case/auth/command/createUser/create-account.command";

import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

@Controller('user')
@ApiTags('User')
export class UserController{
    constructor(
        private readonly commandBus: CommandBus
    ){

    }

    @Post()
   async register(@Body()createUserDTO : CreateUserDTO) : Promise<any>{
        return await this.commandBus.execute(new CreateAccountCommand(createUserDTO.email, createUserDTO.name, createUserDTO.password))
    }

}