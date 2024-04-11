import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AddUserProjectCommand } from "./add-user-project.command";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { ForbiddenException } from "@nestjs/common";
import { ProjectRepositoryOrm } from "@/infrastructures/repositories/project/project.repository";
import { ProjectMemberRepositoryOrm } from "@/infrastructures/repositories/projectMember/projectMember.repository";
import { Connection } from 'typeorm';

@CommandHandler(AddUserProjectCommand)
export class AddUserProjectHandler implements ICommandHandler<AddUserProjectCommand> {
    constructor(
        private readonly userRepositoryOrm: UserRepositoryOrm,
        private readonly projectRepositoryOrm: ProjectRepositoryOrm,
        private readonly projectMemberRepositoryOrm: ProjectMemberRepositoryOrm,
        private readonly connection: Connection,

    ) {

    }

    async execute(command: AddUserProjectCommand): Promise<any> {
        const { userId, projectId, idManager } = command
        return await this.connection.transaction(async (manager) => {
            try {
                const userManager = await this.userRepositoryOrm.findById(idManager);
                const user = await this.userRepositoryOrm.findById(userId);
                const project = await this.projectRepositoryOrm.findById(projectId)
                if (!userManager.isManager) {
                    throw new ForbiddenException()
                }

                const addEmployee = await this.userRepositoryOrm.update(
                    userId,
                    { managerId: userManager.id },
                    manager
                )
                await this.projectMemberRepositoryOrm.create(
                    {
                        project: project, user: user
                    },
                    manager
                )
                return addEmployee
            } catch (error) {
                throw new ForbiddenException({message: "", error})
            }
        });
    }
}