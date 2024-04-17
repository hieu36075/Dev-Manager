import { PositionMemberM } from "@/domain/model/positionMember.model";
import { IPositionMemberRepository } from "@/domain/repositories/positionMember.repository";
import { PositionMember } from "@/infrastructures/entities/positionMember.entity";
import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

export class PositionMemberRepositoryOrm implements IPositionMemberRepository{
    constructor(
        @InjectRepository(PositionMember)
        private readonly posionMemberRepository : Repository<PositionMember>
    ){

    }
    findAll(option?: any): Promise<PositionMemberM[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<PositionMemberM> {
        if(!id){
            throw new BadRequestException()
        }
        const positionMember = await this.posionMemberRepository.findOne({
            where:{
                id: id
            }
        })

        return positionMember
    }
    async create(entity: Partial<PositionMemberM>, manager?: any): Promise<PositionMemberM> {
        const positionMember = new PositionMember
        positionMember.postion = entity.postion
        positionMember.user = entity.user
        
        return await manager.save(positionMember)
    }
    update(id: string, entity: Partial<PositionMemberM>, manager?: any): Promise<PositionMemberM> {
        throw new Error("Method not implemented.");
    }

    async delete(id: string, manager?: EntityManager): Promise<void> {
        const positionMember = await this.findById(id)
        
        await manager.remove(positionMember)
    }
}