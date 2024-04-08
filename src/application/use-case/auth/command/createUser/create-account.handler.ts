import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateAccountCommand } from "./create-account.command";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { UserM } from "@/domain/modal/user.modal";
import { IJwtServicePayload } from "@/domain/adapter/token-service.repository";
import { JwtTokenService } from "@/infrastructures/service/jwt/jwt.service";
import { BcryptService } from "@/infrastructures/service/bcrypt/bcrypt.service";


@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler implements ICommandHandler<CreateAccountCommand>{
    constructor(
        private readonly userRepository : UserRepositoryOrm,
        private readonly jwtService: JwtTokenService,
        private readonly bcryptService: BcryptService
    ){
  
    }
    async execute(command: CreateAccountCommand): Promise<UserM>{
        const {password, name, email} = command
        const hashedPassword = await this.bcryptService.hash(password)
        console.log(hashedPassword)
        const newUser = await this.userRepository.createUser({email: email, name: name, password: hashedPassword});
        return newUser;
    }
}