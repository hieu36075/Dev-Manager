import { LanguageM } from "@/domain/model/language.model";
import { LanguageProjectM } from "@/domain/model/languageProject.modal";
import { ILanguageRepository } from "@/domain/repositories/language.repository";
import { ILanguageProjectRepository } from "@/domain/repositories/languageProject.repository";
import { LanguageProject } from "@/infrastructures/entities/languageProject.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class LanguageProjectRepositoryOrm implements ILanguageProjectRepository{
    constructor(
        @InjectRepository(LanguageProject)
        private readonly languageProjectRepository : Repository<LanguageProject>
    ){

    }
    findAll(option?: any): Promise<LanguageProjectM[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<LanguageProjectM> {
        throw new Error("Method not implemented.");
    }
    async create(entity: Partial<LanguageProjectM>, manager?: any): Promise<LanguageProjectM> {
        const langueProject = new LanguageProject
        langueProject.project = entity.project;
        langueProject.language = entity.language
        langueProject.level = entity.level || '0'
        langueProject.experience = entity.level || '0'
        return await manager.save(langueProject)
    }
    update(id: string, entity: Partial<LanguageProjectM>, manager?: any): Promise<LanguageProjectM> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}