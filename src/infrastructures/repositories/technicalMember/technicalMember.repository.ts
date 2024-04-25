import { TechnicalMemberM } from "@/domain/model/technicalMember.model";
import { ITechnicalMemberRepository } from "@/domain/repositories/technicalMember";
import { TechnicalMember } from "@/infrastructures/entities/technicalMember.entity";
import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { EntityManager, Repository } from "typeorm";

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
    async findById(id: string): Promise<TechnicalMemberM> {
        if(!id){
            throw new BadRequestException({message:"don't have id technical"})
        }
        const technicalMember = await this.technicalMemberRepository.findOne({
            where:{
                id: id
            },
            relations:{
                user:true
            }
        })

        return technicalMember
    }
    async create(entity: Partial<TechnicalMemberM>, manager?: any): Promise<TechnicalMemberM> {
        const projectMember = new TechnicalMember();
        projectMember.technical = entity.technical;
        projectMember.user = entity.user;
        projectMember.level = entity.level;
        projectMember.experience = entity.experience
        return await manager.save(projectMember);
    }
    update(id: string, entity: Partial<TechnicalMemberM>, manager?: any): Promise<TechnicalMemberM> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string, manager?:EntityManager): Promise<any> {
        const technicalMember = await this.findById(id)
        
        await manager.remove(technicalMember)
        return technicalMember.user
    }
    
}