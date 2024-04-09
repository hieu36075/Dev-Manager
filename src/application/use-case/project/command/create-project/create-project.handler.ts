import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateProjectCommand } from "./create-project.command";
import { ProjectRepositoryOrm } from "@/infrastructures/repositories/project/project.repository";
import { ProjectMemberRepositoryOrm } from "@/infrastructures/repositories/projectMember/projectMember.repository";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { ForbiddenException } from "@nestjs/common";

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler implements ICommandHandler<CreateProjectCommand>{
    constructor(
        private readonly projectRepository: ProjectRepositoryOrm,
        private readonly projectMemberRepository : ProjectMemberRepositoryOrm,
        private readonly userRepository: UserRepositoryOrm
    ){

    }

    async execute(command: CreateProjectCommand): Promise<any> {
        const {userId} = command
        try{

            const project = await this.projectRepository.create(command)
            
            const user = await this.userRepository.findById(userId)
            
            const projectMember = await this.projectMemberRepository.create({project: project, user: user})

            return projectMember
        }catch(error){
            throw new ForbiddenException({message:'Create failed', error})
        }
    }
}