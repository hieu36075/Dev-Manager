import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateAccountCommand } from "./create-account.command";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { UserM } from "@/domain/modal/user.modal";
import { IJwtServicePayload } from "@/domain/adapter/token-service.repository";
import { JwtTokenService } from "@/infrastructures/service/jwt/jwt.service";
import { BcryptService } from "@/infrastructures/service/bcrypt/bcrypt.service";
import { ForbiddenException } from "@nestjs/common";
import { RoleRepositoryOrm } from "@/infrastructures/repositories/role/role.repository";
import { Role } from "@/application/common/enums/role.enum";


@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler implements ICommandHandler<CreateAccountCommand>{
    constructor(
        private readonly userRepository : UserRepositoryOrm,
        private readonly jwtService: JwtTokenService,
        private readonly roleRepository: RoleRepositoryOrm,
        private readonly bcryptService: BcryptService
    ){
  
    }
    async execute(command: CreateAccountCommand): Promise<UserM>{
        const {password, userName, email} = command
        try{
            const hashedPassword = await this.bcryptService.hash(password)
            const role = await this.roleRepository.findByName(Role.EMPLOYEE)
            const newUser = await this.userRepository.createUser({email: email, userName: userName, password: hashedPassword},role);
            console.log(newUser)
            return newUser;
        }catch(error){
            throw new ForbiddenException("Invalid error")
        }
    }
}