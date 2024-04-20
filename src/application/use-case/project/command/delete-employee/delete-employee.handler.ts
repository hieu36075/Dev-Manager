import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ForbiddenException, Inject, MethodNotAllowedException, NotFoundException } from "@nestjs/common";
import { ProjectRepositoryOrm } from "@/infrastructures/repositories/project/project.repository";
import { Connection } from 'typeorm';

import { InjectionToken } from "@/application/common/constants/constants";
import { DeleteEmployeeProjectCommand } from "./delete-employee.command";
import { IRoleMemberProjectRepository } from "@/domain/repositories/roleMemberProject.repository";
import { IProjectHistoryRepository } from "@/domain/repositories/projectHistory.repository";
import { ProjectMemberRepositoryOrm } from "@/infrastructures/repositories/projectMember/projectMember.repository";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";

@CommandHandler(DeleteEmployeeProjectCommand)
export class DeleteEmployeeProjectHandler implements ICommandHandler<DeleteEmployeeProjectCommand> {
    constructor(
        private readonly connection: Connection,
        @Inject(InjectionToken.ROLEMEMBERPROJECT_REPOSITORY)
        private readonly roleMemberProjectRepository : IRoleMemberProjectRepository,
        @Inject(InjectionToken.PROJECTHISTORY_REPOSITORY)
        private readonly projectHistoryRepository : IProjectHistoryRepository,
        private readonly projectMemberRepository : ProjectMemberRepositoryOrm,
        private readonly userRepository: UserRepositoryOrm
        // private readonly projectMember: 
        // @Inject(InjectionToken.)
    ) {

    }

    async execute(command: DeleteEmployeeProjectCommand): Promise<any> {
        return await this.connection.transaction(async (manager) => {
            try {
                const currentProjectMember =await this.projectMemberRepository.findById(command.id)
                if(!currentProjectMember){
                    throw new NotFoundException("Don;t found id ")
                }
                for (const roleMember of currentProjectMember.roles) {
                    const roleId = roleMember.id;
                    await this.roleMemberProjectRepository.delete(roleId, manager);
                }
                await this.projectMemberRepository.delete(command.id,manager )
                await this.projectHistoryRepository.create(
                    {project: currentProjectMember.project, user:currentProjectMember.user, type:"Leave-Project", description:`${currentProjectMember.user.profile.fullName} leave in ${currentProjectMember.project.name} project`}, manager
                )
            } catch (error) {
                console.log(error)
                throw new ForbiddenException({message: "", error})
            }
        });
    }
}