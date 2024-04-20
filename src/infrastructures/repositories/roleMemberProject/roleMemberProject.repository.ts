import { RoleMemberProjectM } from "@/domain/model/roleMemberProject.model";
import { IRoleMemberProjectRepository } from "@/domain/repositories/roleMemberProject.repository";
import { RoleMemberProject } from "@/infrastructures/entities/roleMemberProject.entity";
import { NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

export class RoleMemberProjectRepository implements IRoleMemberProjectRepository{
    constructor(
        @InjectRepository(RoleMemberProject)
        private readonly roleMemberProjectRepository : Repository<RoleMemberProject>
    ){
        
    }
    findAll(option?: any): Promise<RoleMemberProjectM[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<RoleMemberProjectM> {
        if(!id){
            throw new NotAcceptableException()
        }
        return await this.roleMemberProjectRepository.findOne({
            where:{
                id:id
            }
        })
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
    async delete(id: string, manager?: EntityManager): Promise<void> {
        const currentRolemember = await this.findById(id)
        await manager.remove(currentRolemember)
        // throw new Error("Method not implemented.");
    }
}