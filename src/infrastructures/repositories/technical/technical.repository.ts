import { PositionM } from "@/domain/model/position.model";
import { TechnicalM } from "@/domain/model/technical.model";
import { ITechnicalRepository } from "@/domain/repositories/technical.repository";
import {  Technical } from "@/infrastructures/entities/technical.entity";
import { ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

export class TechnicalRepositoryOrm implements ITechnicalRepository{
    constructor(
        @InjectRepository(Technical)
        private readonly technicalRepository: Repository<Technical>
    ){

    }
    async findAll(): Promise<TechnicalM[]> {
        return this.technicalRepository.find()
    }
    async findById(id: string): Promise<TechnicalM> {

        if(!id){
            throw new ForbiddenException({message:"Please Check Data Again"})
        }
        try{
            const technical = await this.technicalRepository.findOne({
                where:{
                    id: id
                }
            })
            console.log(technical)
            return technical

        }catch(error){
            console.log(error)
        }
    }
    async create(entity: Partial<TechnicalM>): Promise<TechnicalM> {
        const technical = new PositionM
        technical.name = entity.name
        return await this.technicalRepository.save(technical)

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
    async delete(id: string, manager?:EntityManager): Promise<void> {
        console.log(id)
        const technicalMember = await this.findById(id)
        console.log(technicalMember)
        await manager.remove(technicalMember)
    }

}