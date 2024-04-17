import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserRepositoryOrm } from "@/infrastructures/repositories/user/user.repository";
import { ForbiddenException, Inject } from "@nestjs/common";
import { ProjectRepositoryOrm } from "@/infrastructures/repositories/project/project.repository";
import { ProjectMemberRepositoryOrm } from "@/infrastructures/repositories/projectMember/projectMember.repository";
import { Connection } from 'typeorm';
import { DeleteProjectCommand } from "./delete-project.command";
import { InjectionToken } from "@/application/common/constants/constants";

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler implements ICommandHandler<DeleteProjectCommand> {
    constructor(
        private readonly connection: Connection,
        private readonly projectRepository : ProjectRepositoryOrm,
        // private readonly projectMember: 
        // @Inject(InjectionToken.)
    ) {

    }

    async execute(command: DeleteProjectCommand): Promise<any> {
        return await this.connection.transaction(async (manager) => {
            try {
                
                await this.projectRepository.delete(command.id, manager)
                return 
            } catch (error) {
                throw new ForbiddenException({message: "", error})
            }
        });
    }
}