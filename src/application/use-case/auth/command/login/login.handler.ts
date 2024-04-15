import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { UserM } from "@/domain/model/user.model";
import { IJwtServicePayload } from "@/domain/adapter/token-service.repository";
import { JwtTokenService } from "@/infrastructures/service/jwt/jwt.service";
import { BcryptService } from "@/infrastructures/service/bcrypt/bcrypt.service";
import { LoginCommand } from "./login.command";
import { Tokens } from "@/application/common/types/tokens.types";
import { ForbiddenException, Inject, NotFoundException } from "@nestjs/common";


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
        const user = await this.userRepository.getUserByEmail(email)
        
        if(!user?.role ===null || !user){
            throw new ForbiddenException({message:"Please check account"})
        }
        
        const verifyPassword = await this.bcryptService.compare(password,user.password )
        if(!verifyPassword){
            throw new ForbiddenException({message:"Please check password again"})
        }
        
        try{   
            return await this.jwtService.createToken({id: user.id, username: user.userName, role: user.role.name})
        }catch(error){
            throw new ForbiddenException(error)
        }
 
    }
}