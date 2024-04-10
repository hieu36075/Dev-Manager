import { PositionM } from "@/domain/model/position.model";
import { SkillM } from "@/domain/model/skill.model";
import { IPositionRepository } from "@/domain/repositories/position.model";
import { ISkillRepository } from "@/domain/repositories/skill.repository";
import { Position } from "@/infrastructures/entities/position.entity";
import { Skill } from "@/infrastructures/entities/skill.entity";
import { ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class SkillRepositoryOrm implements ISkillRepository{
    constructor(
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>
    ){

    }
    async findAll(): Promise<SkillM[]> {
        return this.skillRepository.find()
    }
    async findById(id: string): Promise<SkillM> {
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
    async create(entity: Partial<SkillM>): Promise<SkillM> {
        const skill = new PositionM
        skill.name = entity.name
        return await this.skillRepository.save(skill)

    }
    async update(id: string, entity: Partial<SkillM>): Promise<SkillM> {
        const skill = await this.findById(id)
        if(!skill){
            throw new ForbiddenException({message: 'Not Found Id'})
        }
        skill.name = entity.name

        return await this.skillRepository.save(skill) 
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}