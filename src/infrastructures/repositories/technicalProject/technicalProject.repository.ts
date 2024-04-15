
import { LanguageProjectM } from "@/domain/model/languageProject.modal";
import { TechnicalProjectM } from "@/domain/model/technicalProject.model";
import { ILanguageProjectRepository } from "@/domain/repositories/languageProject.repository";
import { ITechnicalProjectRepository } from "@/domain/repositories/technicalProject.repositoty";
import { LanguageProject } from "@/infrastructures/entities/languageProject.entity";
import { TechnicalProject } from "@/infrastructures/entities/technicalProject.enity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

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
        technicalProject.level = entity.level || '0'
        technicalProject.experience = entity.level || '0'
        return await manager.save(technicalProject)
    }
    update(id: string, entity: Partial<LanguageProjectM>, manager?: any): Promise<TechnicalProjectM> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}