import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { UserM } from "@/domain/modal/user.modal";
import { IJwtServicePayload } from "@/domain/adapter/token-service.repository";
import { JwtTokenService } from "@/infrastructures/service/jwt/jwt.service";
import { BcryptService } from "@/infrastructures/service/bcrypt/bcrypt.service";
import { LoginCommand } from "./login.command";
import { Tokens } from "@/application/common/types/tokens.types";
import { ForbiddenException } from "@nestjs/common";


@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand>{
    constructor(
        private readonly userRepository : UserRepositoryOrm,
        private readonly jwtService: JwtTokenService,
        private readonly bcryptService: BcryptService
    ){
  
    }
    async execute(command: LoginCommand): Promise<Tokens>{
        const {email, password} = command
        try{   
            const user = await this.userRepository.getUserByEmail(email)
            const verifyPassword = await this.bcryptService.compare(password,user.password )
            
            if(!verifyPassword){
                throw new ForbiddenException("Please check again")
            }
            return await this.jwtService.createToken({id: user.id, username: user.userName, role: user.role.name})
        }catch(error){
            throw new ForbiddenException()
        }
 
    }
}