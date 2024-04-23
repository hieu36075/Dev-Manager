
import { LanguageProjectM } from "@/domain/model/languageProject.modal";
import { ProjectM } from "@/domain/model/project.model";
import { TechnicalProjectM } from "@/domain/model/technicalProject.model";
import { ILanguageProjectRepository } from "@/domain/repositories/languageProject.repository";
import { ITechnicalProjectRepository } from "@/domain/repositories/technicalProject.repositoty";
import { LanguageProject } from "@/infrastructures/entities/languageProject.entity";
import { TechnicalProject } from "@/infrastructures/entities/technicalProject.enity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

export class TechnicalProjectRepositoryOrm implements ITechnicalProjectRepository{
    constructor(
        @InjectRepository(TechnicalProject)
        private readonly technicalProjectRepository : Repository<TechnicalProject>
    ){

    }
    findAll(option?: any): Promise<TechnicalProjectM[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<TechnicalProjectM> {
        throw new Error("Method not implemented.");
    }
    async create(entity: Partial<TechnicalProjectM>, manager?: any): Promise<TechnicalProjectM> {
        const technicalProject = new TechnicalProject
        technicalProject.project = entity.project;
        technicalProject.technical = entity.technical;
        return await manager.save(technicalProject)
    }
    update(id: string, entity: Partial<LanguageProjectM>, manager?: any): Promise<TechnicalProjectM> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async removeAll(project:ProjectM, manager: EntityManager):Promise<void>{
        await manager.delete(TechnicalProject, {project: project})
        return Promise.resolve();
    }
}