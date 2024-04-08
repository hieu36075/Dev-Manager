import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateAccountCommand } from "./create-account.command";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user.repository";
import { UserM } from "@/domain/modal/user.modal";


@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler implements ICommandHandler<CreateAccountCommand>{
    constructor(
        private readonly userRepository : UserRepositoryOrm,
    ){
  
    }
    async execute(command: CreateAccountCommand): Promise<UserM>{
        const {password, name, email} = command
        const newUser = await this.userRepository.createUser({email: email, name: name, password: password});
        return newUser;
    }
}