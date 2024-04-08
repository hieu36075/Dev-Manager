import { CreateAccountCommand } from "@/application/use-case/user/command/create-account.command";
import { CreateUserDto } from "@/domain/dto/create-user.dto";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user.repository";
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
   async register(@Body()createUserDTO : CreateUserDto) : Promise<any>{
        return await this.commandBus.execute(new CreateAccountCommand(createUserDTO.email, createUserDTO.name, createUserDTO.password))
    }

}