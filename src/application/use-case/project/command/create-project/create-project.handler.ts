import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProjectCommand } from './create-project.command';
import { ProjectRepositoryOrm } from '@/infrastructures/repositories/project/project.repository';
import { ProjectMemberRepositoryOrm } from '@/infrastructures/repositories/projectMember/projectMember.repository';
import { UserRepositoryOrm } from '@/infrastructures/repositories/user/user.repository';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ProfileM } from '@/domain/model/profile.model';
import { UserM } from '@/domain/model/user.model';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand>
{
  constructor(
    private readonly projectRepository: ProjectRepositoryOrm,
    private readonly projectMemberRepository: ProjectMemberRepositoryOrm,
    private readonly userRepository: UserRepositoryOrm,
    private readonly connection: Connection,
  ) {}

  async execute(command: CreateProjectCommand): Promise<any> {
    const { managerId, employeeId } = command;
    return await this.connection.transaction(async (manager) => {
      try {
        const project = await this.projectRepository.create(command, manager);
        const user = await this.userRepository.findById(managerId);
        const managerUser = await this.projectMemberRepository.create(
          { project: project, user: user },
          manager,
        );
        if (employeeId && employeeId.length > 0) {
          for (const id of employeeId) {
            const currentPofile = await this.userRepository.findById(id);
            if (!currentPofile) {
              throw new ForbiddenException({ message: 'invalid position' });
            }

            await this.projectMemberRepository.create(
              {
                project: project,
                user: currentPofile,
              },
              manager,
            );
          }
        }
        return project;
      } catch (error) {
        if (error.driverError.code === '23505') {
          throw new BadRequestException({ message: 'NAME_ALREADY_EXIST' });
        }
        throw new ForbiddenException({ message: 'Create failed', error });
      }
    });
  }
}
