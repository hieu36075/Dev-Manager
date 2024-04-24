import { LanguageM } from '@/domain/model/language.model';
import { LanguageProjectM } from '@/domain/model/languageProject.modal';
import { ProjectM } from '@/domain/model/project.model';
import { ILanguageRepository } from '@/domain/repositories/language.repository';
import { ILanguageProjectRepository } from '@/domain/repositories/languageProject.repository';
import { LanguageProject } from '@/infrastructures/entities/languageProject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

export class LanguageProjectRepositoryOrm
  implements ILanguageProjectRepository
{
  constructor(
    @InjectRepository(LanguageProject)
    private readonly languageProjectRepository: Repository<LanguageProject>,
  ) {}
  findAll(option?: any): Promise<LanguageProjectM[]> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<LanguageProjectM> {
    return await this.languageProjectRepository.findOne({
        where:{
            id:id
        }
    })
  }

  async findLanguageProject(
    project: any,
    technical?: any,
  ): Promise<LanguageProjectM[]> {
    return await this.languageProjectRepository.find({
      where: {
        project: {
          id: project.id,
        },
      },
      relations: {
        language: true,
      },
    });
  }
  async create(
    entity: Partial<LanguageProjectM>,
    manager?: any,
  ): Promise<LanguageProjectM> {
    const langueProject = new LanguageProject();
    langueProject.project = entity.project;
    langueProject.language = entity.language;
    return await manager.save(langueProject);
  }
  update(
    id: string,
    entity: Partial<LanguageProjectM>,
    manager?: any,
  ): Promise<LanguageProjectM> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async removeAll(project: any, manager: EntityManager): Promise<void> {


    await Promise.all(
      project.map(async (id: string) => {
        const technicalProject = await this.findById(id);
        await this.languageProjectRepository.remove(technicalProject);
      }),
    );
    
  }
}
