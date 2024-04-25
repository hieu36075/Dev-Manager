import { PageMetaDto } from "@/application/dto/pagination/pageMeta.dto";
import { PageOptionsDto } from "@/application/dto/pagination/paginationOptions";
import { PageDto } from "@/application/dto/pagination/responsePagination";
import { PositionM } from "@/domain/model/position.model";
import { TechnicalM } from "@/domain/model/technical.model";
import { ITechnicalRepository } from "@/domain/repositories/technical.repository";
import {  Technical } from "@/infrastructures/entities/technical.entity";
import { ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, ILike, Repository } from "typeorm";

export class TechnicalRepositoryOrm implements ITechnicalRepository{
    constructor(
        @InjectRepository(Technical)
        private readonly technicalRepository: Repository<Technical>
    ){

    }
    async findAll(): Promise<TechnicalM[]> {
        return this.technicalRepository.find({
            where:{
                isDelete:false
            },
            order:{
                created_at:'DESC'
            },
        })
    }

    async findAllOptions(pageOptionsDto: PageOptionsDto): Promise<PageDto<Technical>> {
        const { name, page, take, orderBy } = pageOptionsDto;
    const takeData = take || 10;
    const skip = (page - 1) * take;
    const [result, total] =  await this.technicalRepository.findAndCount({
            where:{
                name: name ? ILike(`%${name.toLowerCase()}%`) : ILike(`%%`),
                isDelete:false
            },
            order:{
                created_at:'DESC'
            },
            skip: skip,
            take:takeData
        })
        const pageMetaDto = new PageMetaDto(pageOptionsDto, total);
    return new PageDto<Technical>(result, pageMetaDto, 'Success');
    }
    async findById(id: string): Promise<TechnicalM> {

        if(!id){
            throw new ForbiddenException({message:"Please Check Data Again"})
        }
        try{
            const technical = await this.technicalRepository.findOne({
                where:{
                    id: id
                },
                relations:{
                    technicalProject:true
                }
            })
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
        const technical = await this.findById(id)
        technical.isDelete = true
         await this.technicalRepository.save(technical)
    }

}