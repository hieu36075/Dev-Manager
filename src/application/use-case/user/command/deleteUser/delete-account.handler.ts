import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteAccountCommand } from "./delete-account.command";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { ProjectMemberRepositoryOrm } from "@/infrastructures/repositories/projectMember/projectMember.repository";
import { MethodNotAllowedException } from "@nestjs/common";

@CommandHandler(DeleteAccountCommand)
export class DeleteAccountHandler
  implements ICommandHandler<DeleteAccountCommand>
{
    constructor(
        private readonly userRepository : UserRepositoryOrm,
        private readonly projectMemberRepository: ProjectMemberRepositoryOrm
    ){

    }
    async execute(command: DeleteAccountCommand): Promise<any> {
        const currentUser = await this.userRepository.findById(command.id)
        const checkUserInProject = await this.projectMemberRepository.findUserInProject(currentUser)
        if(checkUserInProject){
            throw new MethodNotAllowedException({message:'User is in a project, please check again'})
        }
        await this.userRepository.delete(command.id)
        return Promise.resolve();
    }
}