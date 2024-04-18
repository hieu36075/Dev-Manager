import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProjectCommand } from './create-project.command';
import { ProjectRepositoryOrm } from '@/infrastructures/repositories/project/project.repository';
import { ProjectMemberRepositoryOrm } from '@/infrastructures/repositories/projectMember/projectMember.repository';
import { UserRepositoryOrm } from '@/infrastructures/repositories/user/user.repository';
import { ForbiddenException, Inject } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TechnicalRepositoryOrm } from '@/infrastructures/repositories/technical/technical.repository';
import { LanguageProjectRepositoryOrm } from '@/infrastructures/repositories/languageProject/languageProject.repository';
import { TechnicalProjectRepositoryOrm } from '@/infrastructures/repositories/technicalProject/technicalProject.repository';
import { PositionRepositoryOrm } from '@/infrastructures/repositories/position/position.repository';
import { InjectionToken } from '@/application/common/constants/constants';
import { IRoleMemberProjectRepository } from '@/domain/repositories/roleMemberProject.repository';
import { ILanguageRepository } from '@/domain/repositories/language.repository';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand> {
  constructor(
    private readonly projectRepository: ProjectRepositoryOrm,
    private readonly projectMemberRepository: ProjectMemberRepositoryOrm,
    private readonly userRepository: UserRepositoryOrm,
    @Inject(InjectionToken.LANGUAGE_REPOSITORY)
    private readonly languageRepository : ILanguageRepository,
    private readonly languageProjectRepository: LanguageProjectRepositoryOrm,
    private readonly technicalRepository: TechnicalRepositoryOrm,
    private readonly technicalProjectRepository: TechnicalProjectRepositoryOrm,
    private readonly positionProjectRepository: PositionRepositoryOrm,
    @Inject(InjectionToken.ROLEMEMBERPROJECT_REPOSITORY)
    private readonly roleMemberProjectRepostiroy: IRoleMemberProjectRepository,
    private readonly connection: Connection,
  ) { }

  async execute(command: CreateProjectCommand): Promise<any> {
    const { managerId, employeeId, technical, language } = command;
    return await this.connection.transaction(async (manager) => {
      try {
        const user = await this.userRepository.findById(managerId);
        
        const project = await this.projectRepository.create(command, manager);
   

        if (user.isManager === false) {
          throw new ForbiddenException({ message: "Invalid manager" })
        }

        const member = await this.projectMemberRepository.create(
          { project: project, user: user },
          manager,
        );

        if (technical && technical.length > 0) {
          for (const id of technical) {

            const currentTechnical = await this.technicalRepository.findById(id);
            if (!currentTechnical) {
              throw new ForbiddenException({ message: 'invalid technical' });
            }
            await this.technicalProjectRepository.create({
              project: project,
              technical: currentTechnical
            }, manager)
          }
        }

        if (language && language.length > 0) {
          for (const id of language) {

            const currentLanguage = await this.languageRepository.findById(id);

            if (!currentLanguage) {
              throw new ForbiddenException({ message: 'invalid language' });
            }
            await this.languageProjectRepository.create({
              project: project,
              language: currentLanguage
            }, manager)
          }
        }

        if (employeeId && employeeId.length > 0) {
          for (const item of employeeId) {
            const {id, role} = item
            const currentPofile = await this.userRepository.findById(id);
            const currentRole = await this.positionProjectRepository.findRolesAndPushIntoArray(role)
            
            if (!currentPofile) {
              throw new ForbiddenException({ message: 'invalid employee' });
            }
            for(const role of currentRole){
              await this.roleMemberProjectRepostiroy.create({
                position:role,
                projectMember: member
              },manager)
            }
            await this.userRepository.update(id, { managerId: user.id }, manager);
          }
        }

        return project;
      } catch (error) {
        console.log(error)
        // if (error.driverError.code === '23505') {
        //   throw new BadRequestException({ message: 'NAME_ALREADY_EXIST' });
        // }
        throw new ForbiddenException({ message: 'Create failed', error });
      }
    });
  }
}
