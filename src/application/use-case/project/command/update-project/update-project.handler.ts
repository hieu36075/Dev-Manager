import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProjectRepositoryOrm } from "@/infrastructures/repositories/project/project.repository";
import { ProjectMemberRepositoryOrm } from "@/infrastructures/repositories/projectMember/projectMember.repository";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { UpdateProjectCommand } from "./update-project.command";
import { ForbiddenException } from "@nestjs/common";

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler implements ICommandHandler<UpdateProjectCommand>{
    constructor(
        private readonly projectRepository: ProjectRepositoryOrm,
    ){

    }

    async execute(command: UpdateProjectCommand): Promise<any> {
        const {id} = command
        try{
            const project = await this.projectRepository.update(id, command)
            return project
        }catch(error){
            throw new ForbiddenException({message: 'Update failed'})
        }
    }
}