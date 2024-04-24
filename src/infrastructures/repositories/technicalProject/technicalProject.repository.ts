
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
    async findById(id: string): Promise<TechnicalProjectM> {
        return await this.technicalProjectRepository.findOne({
            where:{
                id: id
            }
        })
    }

    async findTechnicalProject(project: any, technical?:any ): Promise<TechnicalProjectM[]> {
        return await this.technicalProjectRepository.find({
            where:{
                project:{
                    id: project.id
                }
            },
            relations:{
                technical:true
            }
        })
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
    async delete(id: string, manager?:EntityManager): Promise<void> {
        const curent = await this.findById(id)

        await manager.remove(curent)
    }

    async removeAll(project:any, manager: EntityManager):Promise<void>{
        await Promise.all(project.map(async (id:string) => {
            const technicalProject = await this.findById(id)
            await this.technicalProjectRepository.remove(technicalProject);
        }));

    }
}