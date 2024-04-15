import { TechnicalMemberM } from "@/domain/model/technicalMember.model";
import { ITechnicalMemberRepository } from "@/domain/repositories/technicalMember";
import { TechnicalMember } from "@/infrastructures/entities/technicalMember.entity";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

export class TechnicalMemberRepositoryOrm implements ITechnicalMemberRepository{
    constructor(
        @InjectRepository(TechnicalMember)
        private readonly technicalMemberRepository : Repository<TechnicalMemberM>
    ){

    }
    async findAll(option?: any): Promise<TechnicalMemberM[]> {
        return await this.technicalMemberRepository.find()
        // throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<TechnicalMemberM> {
        throw new Error("Method not implemented.");
    }
    async create(entity: Partial<TechnicalMemberM>, manager?: any): Promise<TechnicalMemberM> {
        const projectMember = new TechnicalMember();
        projectMember.technical = entity.technical;
        projectMember.profile = entity.profile;
        return await manager.save(projectMember);
    }
    update(id: string, entity: Partial<TechnicalMemberM>, manager?: any): Promise<TechnicalMemberM> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}