import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProjectRepositoryOrm } from "@/infrastructures/repositories/project/project.repository";
import { ProjectMemberRepositoryOrm } from "@/infrastructures/repositories/projectMember/projectMember.repository";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { UpdateProjectCommand } from "./update-project.command";
import { ForbiddenException } from "@nestjs/common";
import { UserM } from "@/domain/model/user.model";

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler implements ICommandHandler<UpdateProjectCommand>{
    constructor(
        private readonly projectRepository: ProjectRepositoryOrm,
        private readonly userRepository : UserRepositoryOrm
    ){

    }

    async execute(command: UpdateProjectCommand): Promise<any> {
        const {id, managerId} = command
        try{
            let manager : UserM
            if(managerId){
                manager = await this.userRepository.findById(managerId)
            }
            
            
            const project = await this.projectRepository.update(id, {...command,user: manager})
            return project
        }catch(error){
            console.log(error)
            throw new ForbiddenException({message: 'Update failed'})
        }
    }
}