import { ProjectHistoryM } from "@/domain/model/projectHistory.model";
import { IProjectHistoryRepository } from "@/domain/repositories/projectHistory.repository";
import { ProjectHistory } from "@/infrastructures/entities/projectHistory.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class ProjectHistoryRepositoryOrm implements IProjectHistoryRepository{
    constructor(
        @InjectRepository(ProjectHistory)
        private readonly projectHistoryRepository : Repository<ProjectHistory>
    ){

    }
    async findAll(option?: any): Promise<ProjectHistoryM[]> {
        return await this.projectHistoryRepository.find()
    }
    findById(id: string): Promise<ProjectHistoryM> {
        throw new Error("Method not implemented.");
    }
    async create(entity: Partial<ProjectHistoryM>, manager?: any): Promise<ProjectHistoryM> {
        const projectHistory = new ProjectHistory
        projectHistory.project = entity.project
        projectHistory.user = entity.user
        projectHistory.type = entity.type
        projectHistory.description = entity.description
        return await manager.save(projectHistory)
    }
    update(id: string, entity: Partial<ProjectHistoryM>, manager?: any): Promise<ProjectHistoryM> {
        throw new Error("Method not implemented.");
    }
    delete(id: string, manager?: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
}