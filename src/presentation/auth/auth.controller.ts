import { LoginDTO } from "@/application/dto/auth/login.dto";
import { LoginCommand } from "@/application/use-case/auth/command/login/login.command";
import { Tokens } from "@/application/common/types/tokens.types";
import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";

@Controller('auth')
@ApiTags('Auth')
export class AuthController{
    constructor(
        private readonly commandBus: CommandBus
    ){

    }

    @Post()
   async login(@Body() loginDTO: LoginDTO) : Promise<Tokens>{
        return await this.commandBus.execute(new LoginCommand(loginDTO.email, loginDTO.password))
    }

}