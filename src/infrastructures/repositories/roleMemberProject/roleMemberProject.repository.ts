import { RoleMemberProjectM } from "@/domain/model/roleMemberProject.model";
import { IRoleMemberProjectRepository } from "@/domain/repositories/roleMemberProject.repository";
import { RoleMemberProject } from "@/infrastructures/entities/roleMemberProject.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class RoleMemberProjectRepository implements IRoleMemberProjectRepository{
    constructor(
        @InjectRepository(RoleMemberProject)
        private readonly roleMemberProjectRepository : Repository<RoleMemberProject>
    ){
        
    }
    findAll(option?: any): Promise<RoleMemberProjectM[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<RoleMemberProjectM> {
        throw new Error("Method not implemented.");
    }
    async create(entity: Partial<RoleMemberProjectM>, manager?: any): Promise<RoleMemberProjectM> {
        const roleMemberProject = new RoleMemberProject
        roleMemberProject.position = entity.position
        roleMemberProject.projectMember = entity.projectMember
        return await manager.save(roleMemberProject)
    }
    update(id: string, entity: Partial<RoleMemberProjectM>, manager?: any): Promise<RoleMemberProjectM> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}