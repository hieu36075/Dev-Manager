import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AddUserProjectCommand } from "./add-user-project.command";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { ForbiddenException, Inject, NotFoundException } from "@nestjs/common";
import { ProjectRepositoryOrm } from "@/infrastructures/repositories/project/project.repository";
import { ProjectMemberRepositoryOrm } from "@/infrastructures/repositories/projectMember/projectMember.repository";
import { Connection } from 'typeorm';
import { InjectionToken } from "@/application/common/constants/constants";
import { IRoleMemberProjectRepository } from "@/domain/repositories/roleMemberProject.repository";
import { PositionRepositoryOrm } from "@/infrastructures/repositories/position/position.repository";
import { PositionM } from "@/domain/model/position.model";

@CommandHandler(AddUserProjectCommand)
export class AddUserProjectHandler implements ICommandHandler<AddUserProjectCommand> {
    constructor(
        private readonly userRepositoryOrm: UserRepositoryOrm,
        private readonly projectRepositoryOrm: ProjectRepositoryOrm,
        // @Inject(InjectionToken.)
        private readonly projectMemberRepositoryOrm: ProjectMemberRepositoryOrm,
        @Inject(InjectionToken.ROLEMEMBERPROJECT_REPOSITORY)
        private readonly roleMemberProjectRepository : IRoleMemberProjectRepository,
        private readonly positonRepository: PositionRepositoryOrm,
        private readonly connection: Connection,

    ) {

    }

    async execute(command: AddUserProjectCommand): Promise<any> {
        const { roles, projectId, employeeId} = command
        return await this.connection.transaction(async (manager) => {
            try {
                // const userManager = await this.userRepositoryOrm.findById(idManager);
                const user = await this.userRepositoryOrm.findById(employeeId);
                const project = await this.projectRepositoryOrm.findById(projectId)
                // if (!userManager.isManager) {
                //     throw new ForbiddenException()
                // }
                const addEmployee = await this.projectMemberRepositoryOrm.create(
                    {
                        project: project, user: user,
                    },
                    manager
                )

                for (const id of roles) {
                    const position = await this.positonRepository.findById(id)
                    if(!position){
                        throw new NotFoundException("don't found id")
                    }
          
                    await this.roleMemberProjectRepository.create(
                        {position: position, projectMember:addEmployee },manager
                    )

                }


                return addEmployee
            } catch (error) {
                throw new ForbiddenException({message: "", error})
            }
        });
    }
}