import { PositionM } from "@/domain/model/position.model";
import { TechnicalM } from "@/domain/model/skill.model";
import { ITechnicalRepository } from "@/domain/repositories/technical.repository";
import {  Technical } from "@/infrastructures/entities/technical.entity";
import { ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

export class TechnicalRepositoryOrm implements ITechnicalRepository{
    constructor(
        @InjectRepository(Technical)
        private readonly skillRepository: Repository<Technical>
    ){

    }
    async findAll(): Promise<TechnicalM[]> {
        return this.skillRepository.find()
    }
    async findById(id: string): Promise<TechnicalM> {
        if(!id){
            throw new ForbiddenException({message:"Please Check Data Again"})
        }
        const skill = await this.skillRepository.findOne({
            where:{
                id:id
            }
        })
        return skill
    }
    async create(entity: Partial<TechnicalM>): Promise<TechnicalM> {
        const skill = new PositionM
        skill.name = entity.name
        return await this.skillRepository.save(skill)

    }
    async update(id: string, entity: Partial<TechnicalM>,menager?: EntityManager): Promise<TechnicalM> {
        const technical = await this.findById(id)
        if(!technical){
            throw new ForbiddenException({message: 'Not Found Id'})
        }
        technical.name = entity.name
        // technical.technicalMember = entity.technicalMember
        return await menager.save(technical) 
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}