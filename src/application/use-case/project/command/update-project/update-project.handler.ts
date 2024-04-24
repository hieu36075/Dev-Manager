import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProjectRepositoryOrm } from '@/infrastructures/repositories/project/project.repository';
import { ProjectMemberRepositoryOrm } from '@/infrastructures/repositories/projectMember/projectMember.repository';
import { UserRepositoryOrm } from '@/infrastructures/repositories/user/user.repository';
import { UpdateProjectCommand } from './update-project.command';
import {
  ForbiddenException,
  Inject,
  NotAcceptableException,
} from '@nestjs/common';
import { UserM } from '@/domain/model/user.model';
import { InjectionToken } from '@/application/common/constants/constants';
import { ILanguageRepository } from '@/domain/repositories/language.repository';
import { LanguageProjectRepositoryOrm } from '@/infrastructures/repositories/languageProject/languageProject.repository';
import { TechnicalRepositoryOrm } from '@/infrastructures/repositories/technical/technical.repository';
import { TechnicalProjectRepositoryOrm } from '@/infrastructures/repositories/technicalProject/technicalProject.repository';
import { Connection } from 'typeorm';

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler
  implements ICommandHandler<UpdateProjectCommand>
{
  constructor(
    private readonly projectRepository: ProjectRepositoryOrm,
    private readonly userRepository: UserRepositoryOrm,
    private readonly languageProjectRepository: LanguageProjectRepositoryOrm,
    private readonly technicalRepository: TechnicalRepositoryOrm,
    private readonly technicalProjectRepository: TechnicalProjectRepositoryOrm,
    @Inject(InjectionToken.LANGUAGE_REPOSITORY)
    private readonly languageRepository: ILanguageRepository,
    private readonly connection: Connection,
  ) {}

  async execute(command: UpdateProjectCommand): Promise<any> {
    const { id, managerId, language, technical } = command;
    return await this.connection.transaction(async (manager) => {
      try {
        let newManager: UserM;
        if (managerId) {
          newManager = await this.userRepository.findById(managerId);
        }
        const currentProject = await this.projectRepository.findById(id);

        
        if (language) {
          const currentLanguageProject =
            await this.languageProjectRepository.findLanguageProject(
              currentProject,
            );
          const idsToDelete = currentLanguageProject
            .filter((item) => !technical.includes(item.language.id))
            .map((item) => item.id);

          await this.technicalProjectRepository.removeAll(idsToDelete, manager);
          for (const id of technical) {
            const checkLanguage = currentLanguageProject.filter(
              (item) => item.language.id === id,
            );
            if(checkLanguage.length > 0) continue;
            const newLanguage = await this.languageRepository.findById(id);
            if (!newLanguage) throw new NotAcceptableException('Id invalid');
            await this.languageProjectRepository.create({
              language: newLanguage,
              project: currentProject,
            },manager);
          }
        }
        
        if (technical) {
          const currentTechnicalProject =
            await this.technicalProjectRepository.findTechnicalProject(
              currentProject,
            );
          const idsToDelete = currentTechnicalProject
            .filter((item) => !technical.includes(item.technical.id))
            .map((item) => item.id);

          await this.technicalProjectRepository.removeAll(idsToDelete, manager);
          for (const id of technical) {
            const checkTechnical = currentTechnicalProject.filter(
              (item) => item.technical.id === id,
            );
            if(checkTechnical.length > 0) continue;
            const newTechnical = await this.technicalRepository.findById(id);
            if (!newTechnical) throw new NotAcceptableException('Id invalid');
            await this.technicalProjectRepository.create({
              technical: newTechnical,
              project: currentProject,
            },manager);
          }
        }
        const project = await this.projectRepository.update(id, {
            ...command,
            user: newManager,
          });
        return project;
      } catch (error) {
        console.log(error);
        throw new ForbiddenException({ message: 'Update failed' });
      }
    });
  }
}
